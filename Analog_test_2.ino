#define DO_RLed 14 //Output D5
 
int AI_Pot = 0; //Deklarerar en variabel
int varde2 = 0;
int PotValue = 0;
int varde3 = 0;
long DelayTime;
int Hej = 22;
long Time;

void setup() {
    pinMode (DO_RLed, OUTPUT);
    pinMode (AI_Pot, INPUT);
    Serial.begin(9600);
  };

 
typedef enum Lightstate {
Statestand,
Statechange,
Statestill
};
 
Lightstate LState;
  
  void loop(){

    switch (LState){ 
      LState = Statestand;
     
     case Statestand:
     PotValue = analogRead(AI_Pot);
     if(PotValue > 420){
      Serial.println(Hej);
     
     delay(500);
     varde2 = analogRead(AI_Pot);
      if(PotValue - 30 - varde2 > 0){
        delay(500);
        varde3 = analogRead(AI_Pot);
          if(varde2 - varde3 < 0){
            LState = Statechange;
            }
          } else {
            LState = Statestand;
            }
            break;
           
            case Statechange:
            PotValue = analogRead(AI_Pot);
            DelayTime =long(PotValue);
            Serial.println(PotValue);            
            
            delay(250);
            varde2 = analogRead(AI_Pot);
            if(PotValue < 200){
               Serial.println("Stilla");
               Serial.println(PotValue);
               LState = Statestand;
                }
             else{
              analogWrite(DO_RLed, DelayTime);
              LState = Statechange;
              }
              
           break;
           
     
     
   }else {
     LState = Statestand;
    }
 }  
 }



     /*DelayTime =long(PotValue);
     Serial.println(PotValue);
     delay(50);
     if((PotValue - varde2) >= -9 && (PotValue - varde2) <= 9)
     analogWrite(DO_RLed, DelayTime);*/
 

