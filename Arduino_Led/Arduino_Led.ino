#include <ArduinoJson.h>
#define D7 13
#include <ESP8266WiFi.h>          //https://github.com/esp8266/Arduino //needed for library
#define AI_Pot 0 //definerar analog ingång / utgång
#define DO_RLed 14 // definerar ingång 7
#include <ESP8266WiFi.h>     
//Både ArduinoJson och Wifimanager måste installeras som bibliotek, de finns med i bibliotekskatalogen, tänk att ArduinoJSon versionen som ska väljas är 5.13 och inte senaste.     
#include <ArduinoJson.h> // V 5.13 inte 6! https://arduinojson.org/?utm_source=meta&utm_medium=library.properties
//needed for library
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <WiFiManager.h>         //https://github.com/tzapu/WiFiManager
#define D7 13 // SPI Bus MOSI

String Lampname="lampa"; //Lampans namn
int paav = 0;
int varmvalue =0;
int kallvalue =0;
int Ljusstrykavalue= 0; //ljusstyrka
bool LampExist=false; //Finns lampan redan eller är den ny?
bool GottenValues = false; //Har vi hämtat några värden redan från databasen?
int PotValue = 0; // skapar datatypen i int
int pa = 0; // som ovan
int v = 0; //som ovan
int Potvalue2 = 0; // som ovan
long Delaytime = 0; //skapar en datyp som kallas long

typedef enum Lightstate { //skapar olika state koden går igenom 
Stateapp,
Statea, // skapar en state som heter Statea
Stateb, //som ovan
Statec, //som ovan
Stated,//som ovan
Statestand, //som ovan
Statechange1, // som ovan
Statechange2, //som ovan
Statechange3, //som ovan
Stateedit, // som ovan
konfirmation //som ovan
};

Lightstate LState; 

void setup() {
      pinMode(13, OUTPUT); //Declare GPIO13 as output

    // put your setup code here, to run once:
    Serial.begin(115200);
  //Från Wifimanagers hemsida.
    //WiFiManager
    //Local intialization. Once its business is done, there is no need to keep it around
    WiFiManager wifiManager;
    //reset saved settings
    //wifiManager.resetSettings();
    
    //set custom ip for portal
    //wifiManager.setAPStaticIPConfig(IPAddress(10,0,1,1), IPAddress(10,0,1,1), IPAddress(255,255,255,0));

    //fetches ssid and pass from eeprom and tries to connect
    //if it does not connect it starts an access point with the specified name
    //here  "AutoConnectAP"
    //and goes into a blocking loop awaiting configuration
    wifiManager.autoConnect("Ljuside5");
    //or use this for auto generated name ESP + ChipID
    //wifiManager.autoConnect();

    //if you get here you have connected to the WiFi
    Serial.println("connected...yeey :)");

    pinMode (DO_RLed, OUTPUT); //Ska vara en output
    pinMode (AI_Pot, INPUT); //ska bete sig som en input 
    analogWrite(DO_RLed, PotValue); // Ska skicka ut till DO_Rled med värdet Porvalue (I det här fallet 0)
    LState = Stateapp; //säger att Lstate ska gå över till Statea

}



String GetfromDB(String host){
String url= "/grupp5/"+Lampname; //Urlen jag använder för att posta mina värden
  // Detta skickar värdena till servern.
   String Output ="GET "+ url + " HTTP/1.1\r\n" + //Säger att det är typen post, kan vara patch, get,delete beroende på vad man vill göra., samt urlen vi ska till.
                 "Host: " + host+ "\r\n" + //Berättar vilken host det är vi ansluter till
                 "\r\nConnection: close\r\n\r\n"; //skickar vår buffer som  body

     
                
 return Output;


}

  String SendtoDB(String host){
  String type ="PATCH ";
  String url= "/grupp5/" + Lampname; //Urlen jag använder för att posta mina värden
   
  StaticJsonBuffer<300> jsonBuffer; //Skapar en buffer, det vill säga så mycket minne som vårt blivande jsonobjekt får använda.
  JsonObject& root = jsonBuffer.createObject(); //Skapar ett jsonobjekt som vi kallar root
  root["name"] = Lampname; //Skapar parameterna name och ger den värdet Lampname
  root["ljusstryrka"] = Ljusstrykavalue; // Samma som ovan
  root["påav"] = paav;
  String buffer;  //Skapar en string som vi kallar buffer
  root.printTo(buffer); //Lägger över och konverterar vårt jsonobjekt till en string och sparar det i buffer variabeln.
  
      Serial.println("Uppdaterar värdet ayyy!");

  // Detta skickar värdena till servern.
   String Output =type+url + " HTTP/1.1\r\n" + //Säger att det är typen post, kan vara patch, get,delete beroende på vad man vill göra., samt urlen vi ska till.
                 "Host: " + host+ "\r\n" + //Berättar vilken host det är vi ansluter till
                 "Content-Type: application/json\r\n" + //Säger att det är Json format vi skickar (dock konverterat till en string för att kunna skickas.
                 "Content-Length: " + buffer.length() + "\r\n" + //Berättar hur stort packet vi ska skicka.
                 "\r\n" + // Detta är en extra radbrytning för att berätta att det är här bodyn startar.
                 buffer + "\n"; //skickar vår buffer som  body

 return Output;
}

void ConnecttoDB(String input){

   const int httpPort = 3000; //porten vi ska till
  const char* host = "iot.abbindustrigymnasium.se";//Adressen vi ska ansluta till. 7Laddaremygglustbil "http://iot.abbindustrigymnasium.se"
    
     Serial.print("connecting to ");
     Serial.println(host); //Skriver ut i terminalen för att veta vart vi ska skicka värdena.

  
  // Use WiFiClient class to create TCP connections
  WiFiClient client;
  if (!client.connect(host, httpPort)) { //Försöker ansluta
    Serial.println("connection failed");

    return;
  }
  else  //Om vi kan ansluta så ska lampa lysa
  {
    //digitalWrite(13, HIGH);
    }
if(input =="GET")
client.print(GetfromDB(host));
else
client.print(SendtoDB(host));

  unsigned long timeout = millis();
  while (client.available() == 0) {
    if (millis() - timeout > 10000) {
      Serial.println(">>> Client Timeout !");
      client.stop();
      return;
    }
  }

String json = ""; //De delarna vi vill ha ut av meddelandet sparar vi i stringen json
boolean httpBody = false; //bool för att säa att vi har kommit ner till bodydelen
// tittar om vi har anslutit till clienten
while (client.available()) {
  String line = client.readStringUntil('\r'); //Läser varje rad tills det är slut på rader
  if (!httpBody && line.charAt(1) == '{') { //Om vi hittar { så vet vi att vi har nått bodyn
    httpBody = true; //boolen blir true för att vi ska veta för nästa rad att vi redan är i bodyn
  }
  if (httpBody) { //Om bodyn är sann lägg till raden i json variabeln
    json += line;
  }
}
//Skriver ut bodyns data
    Serial.println("Got data:");
    Serial.println(json);
  if(input =="GET") //Om det är Get så kör vi metoden UpdateValues
    UpdateValues(json);


  Serial.println("closing connection");
}

void UpdateValues(String json){
      //Vi skapar ett Jsonobjekt där vi klistrar in värdena från bodyn
      Serial.print(Lampname);
      StaticJsonBuffer<400> jsonBuffer;
    JsonObject& root = jsonBuffer.parseObject(json);
    //Vi skapar sedan lokala strings där vi lägger över värdena en i taget
    String dataL = root["name"];
         if(dataL!="none")
         {
    int datah = root["ljusstryrka"];
    int datap = root["påav"];

    //Därefter skriver vi över de lokala värdena till våra globala värden för lampan
     Lampname = dataL; 
     Ljusstrykavalue=datah;
     datap = paav;
     


       LampExist=true;
     Serial.print(kallvalue);
         }
         else
         {
          String Mess =root["message"];
         Serial.print(Mess);
         }
         Serial.print(Lampname);
  GottenValues = true;
}

void UpdatingLamp(){
  if(varmvalue>50)
  digitalWrite(13, HIGH);
else
  digitalWrite(13, LOW);
}

void loop() {
  //UpdatingLamp();
 // ConnecttoDB("GET"); 
  switch (LState){
    case Stateapp:
    PotValue = analogRead(AI_Pot);
      if (PotValue < 400){
      UpdatingLamp();
      delay(50);
      ConnecttoDB("GET"); 
      Ljusstrykavalue = test;
      analogWrite(DO_RLed, test);}
      else if(PotValue > 400){
        LState = Stateb;
      }
      break;
    case Statea:
      PotValue = analogRead(AI_Pot); //Sätter PotValue till det värdet avsåndsmätaren får
      Serial.println(PotValue); //skriver ut den
      delay(90); //väntar 90 milisekunder
      if   (PotValue > 500){ //Om avsånds mätaren får ett värde som ärr större än 70 så går den in i Stateb caset
           LState = Stateb; //går in i Stateb 
      }else{ // om inte kravet (Potvalue är större än 70) 
           Serial.println("A"); //Skriver A i Serial monitorn
           LState = Statea; // Går tillbaka till början
        }
        break;
        
      case Stateb:
      PotValue = analogRead(AI_Pot); //Sätter PotValue till det värdet avsåndsmätaren får
      Serial.println(PotValue); // Skriver ut PotValue i serial monitorn
      delay(90); // fördröjning på 90 milisekunder
      if (PotValue < 300){ // Om värdet från avståndsmätaren är mindre än 100 går den till koden nedan
        LState = Statec; //Förflyttar sig till Statec
     }else{ // om inte PotValue är mindre än 100 går den till koden nedan
        Serial.print("B"); //skriver B i serial monitorn
        LState = Stateb; //kör om Stateb
      }
    break;

    case Statec:
      for (int k=0; k <= 20; k++){ //Sätter variabeln k till 0 och koden loopas så länge k är mindre än 20, varje gång koden loppas ökar k med 1
        PotValue = analogRead(AI_Pot); //Sätter PotValue till det värdet avsåndsmätaren får
        Serial.println(PotValue); //Skriver ut Potvalue i serial monitorn
        delay(90);  // fördröjning på 90 milisekunder
        if (PotValue > 500) { //om PotValue är större än 90
          LState = Stated; //Gå över till case Stated
          break;
       }else{ // om inte PotValue är större än 90
         Serial.print("C"); // skriver ut C I serial monitorn
         }
      } 
    if (PotValue < 300){ //om PotValue är mindre än 70
      LState=Stateapp; //Börjar om och går till Statea
    }
  break;

  case Stated:
      PotValue = analogRead(AI_Pot); //Sätter PotValue till det värdet avsåndsmätaren får
      Serial.println(PotValue); //Skriver ut Potvalue i serial monitorn
    if (PotValue < 30){ //om PotValue är mindre än 30
      LState=Stateapp; //går tillbaka till början till Statea
    }else if(pa == 1){ //Om variabeln pa är lika med 1 så ska nedstående kod ske
      PotValue = 0; //Ställer om PotValue 0
      Serial.print("D"); //Skriver D i Serial monitorn
      analogWrite(DO_RLed, PotValue); //Stänger av lampan
       pa = 0; //sätter variabeln pa till 0
       paav = 0;
       Ljusstrykavalue = PotValue;
       ConnecttoDB("PATCH");
      LState=Stateapp; //Går till början Statea
          
    }else{ //om inga av uppstående krav mötts, ska koden nedanför köras
    
      PotValue = 300; // Bestämmer att PotValue är lika med 350
      Serial.print("D"); // Skriver ut D i Serial monitorn
      analogWrite(DO_RLed, PotValue); //Sätter på Lamapan i ljustyrkan PotValue (350)
      delay(250);//Fördröjning 250 milisekunder
      pa = 1; //Sätter variabeln pa till 1
      delay(250);  //Fördröjning 250 milisekunder
       Ljusstrykavalue = PotValue;
       paav = 1;
        ConnecttoDB("PATCH");
      LState=Statestand; //Går till case Statestand
    }
 
  break;

  case Statestand:
        PotValue = analogRead(AI_Pot); //Sätter PotValue till det värdet avsåndsmätaren får
        Serial.print("Stand"); //skriver Stand i serial monitorn
        Serial.println(PotValue); //Skriver ut PotValue i serial monitorn
        delay(90); 
        if (PotValue > 400){ // om Potvalue är större än 80
          PotValue = analogRead(AI_Pot); //Sätter PotValue till det värdet avsåndsmätaren får
          LState = Statechange1; // går över till case Statechange1
        }else{ // om inte if funktionen är uffyld 
          Serial.println("Stand"); //skriver stand i serialmonitorn
          LState = Statestand; //Startar om och går till case StateStand
        }
          break;

  case Statechange1:
     for(int z=0; z <= 60; z++){  //Sätter variabeln a till 0 och koden loopas så länge z är mindre än 60, varje gång koden loppas ökar z med 1
      Potvalue2 = analogRead(AI_Pot); //Sätter PotValue2till det värdet avsåndsmätaren får
      Serial.println("SC1"); //skriver SC1 i serial monitorn
      Serial.println(Potvalue2); //Skriver ut PotValue2
      delay(20);
      if (PotValue > Potvalue2 + 30){ // Potvalue ska vara större än Potvalue2 och +30. med andra ord ska avståndsmätaren ge mindrevärden genom att ta ner handen
        Potvalue2 = analogRead(AI_Pot); //Sätter PotValue2 till det värdet avsåndsmätaren får
          LState = Statechange2; // forsätter i StateChange2
      }else{
          Serial.println("SC1"); // skric sc1 i serial monitorn
      }
     }  
      if(Potvalue2 <= 400){ // om PotValue2 är lika eller mindre än 90
          Serial.print("Falied to connect to edit mode."); //ska skriva Failed to connect to edite mode i serial monitorn
          LState = Statestand; //Går tillbaka till statestand
      }
    
        break;

  case Statechange2:
    for(int x=0; x <= 60; x++){ //Sätter variabeln x till 0 och koden loopas så länge x är mindre än 60, varje gång koden loppas ökar x med 1
      PotValue = analogRead(AI_Pot); //Sätter PotValue till det värdet avsåndsmätaren får
      Serial.println("SC2_");//skriver ut sc2 i serial monitorn
      Serial.println(PotValue); //skriver PotValue i serial monitorn
      delay(20);
      if(PotValue - 30 > Potvalue2){ //om PotValue är större än PotValue2 ska koden forsätta. Det uppfylls genom att ta handen närmare avståndsmätaren
        PotValue = analogRead(AI_Pot); //Sätter PotValue till det värdet avsåndsmätaren får
        LState = Statechange3; //Går till case Statechange3
      }else{
        Serial.println("SC2_"); //skriver ut SC2_ i serialmonitorn
      }
  }
    
    if(PotValue < 400){ //om PotValue är mindre än 90
      Serial.print("Faild to connect to edit mode."); //skriver den Failed to connect to edite mode
      LState = Statestand; //går tillbaka till statestand
    }
    break;

    case Statechange3:
     for(int c=0; c <= 60; c++){//Sätter variabeln c till 0 och koden loopas så länge c är mindre än 60, varje gång koden loppas ökar c med 1
      Potvalue2 = analogRead(AI_Pot); //Sätter PotValue2 till det värdet avsåndsmätaren får
      Serial.println(Potvalue2); //skriver ut Potvalue2 i serial monitorn
      Serial.println("SC3_"); //Skriver ut  SC3 i serial monitorn
      delay(20);
      if (PotValue > Potvalue2 + 70){ //om Potvalue är större än PotValue2 + 30, uppnås genom att ta handen längre bort från avstånds mätaren
          LState = Stateedit; // går till case stateedit
      }else{
          Serial.println("SC3_");
      }  
  }
      if(Potvalue2 <= 400){
          Serial.print("Falied to connect to edit mode."); //skriver failed to connect
          LState = Statestand; //går tillbaka till case statestand
      }
      break;

      case Stateedit:
         PotValue = analogRead(AI_Pot);//Sätter PotValue till det värdet avsåndsmätaren får
            Delaytime =long(PotValue); // sätter värdet från Potvalue till delay time
            Serial.println("Edite"); //serial printar edite i serial monitorn
            Serial.println(PotValue); //skriver ut värdet
            delay(40);
            if(PotValue < 200){ //om potvalue är mindre än 100 stängs lampan av
               Serial.println("AV"); // skirver av i serial monitorn
               PotValue = 0; // sätter potvalue till 0
               analogWrite(DO_RLed, PotValue); //stänger av
               pa = 1; // säter variabeln pa till 1
               v =0; //sätter variabeln v till 0
               LState = Stated; //går till case stated
                }
             else{
              Serial.println("Editing!"); //skriver editing! i serial monitorn
              analogWrite(DO_RLed, Delaytime); //sätter lampan på värdet från delay time
              v++; // adderar 1 till variabeln v
              if(v >= 100){ //om v är 100 eller mer så ska nedståendde kod ske
                Serial.println("Edit complete!"); //serial pritar edite complete
                v = 0; // sätter v till 0
                 Ljusstrykavalue = Delaytime;
                LState = konfirmation; //går till case konfirmation
              }
               
              }
              
           break;

      case konfirmation:
      delay(220); //delay 220 milisekunder
      int l = 0; //sätter variabeln l till 0
      analogWrite(DO_RLed, l); //gör så att lampan släcks
      delay(200); // liten delay
      analogWrite(DO_RLed, Delaytime); //tänder lampan på det värdet använderen valde i case stateedit
      delay(200); //lite delay
      analogWrite(DO_RLed, l); // släcker lampan
      delay(200); // lite delay
      analogWrite(DO_RLed, Delaytime); //tänder lampan på det värdet använderen valde i case stateedit
       ConnecttoDB("PATCH");
      LState = Statestand; // går över till case Statestand.
      break;
  }
}
   //analog write, 0 -1023


  // digitalWrite(13, LOW);

