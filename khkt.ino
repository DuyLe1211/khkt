#include <FirebaseESP8266.h>
#include <ESP8266WiFi.h>

#define LedPin 16

#define WIFI_SSID "Phong Tin Hoc" // your wifi SSID
#define WIFI_PASSWORD "12345@12345" //your wifi PASSWORD

#define LedPin 16         // pin d0 as toggle pin
#define FIREBASE_HOST "khkt-847e4-default-rtdb.asia-southeast1.firebasedatabase.app" // change here
#define FIREBASE_AUTH "mBe3LBIRDglaSyigKOmuOSakvPZDJPjza8iNBw6d"  // your private key
#define USER_EMAIL "leminhduy12112007@gmail.com"
#define USER_PASSWORD "lmD@12112007"
FirebaseAuth auth;
FirebaseConfig config;
FirebaseData firebaseData;

void setup ()
{
  pinMode(LedPin, OUTPUT);
  Serial.begin(9600);
  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ") ;
  Serial.println(WiFi.localIP());

  config.host = FIREBASE_HOST;
  config.api_key = FIREBASE_AUTH;

  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);     
}
void loop ()
{
  if(Firebase.getString(firebaseData, "/person"))
  {
    String person = firebaseData.stringData();
    if (person.toInt() == 0) {
      digitalWrite(LedPin, LOW);
    } else {
      digitalWrite(LedPin, HIGH);
      delay(5000);
    }
  }else{
    Serial.print("Error in getInt, ");
    Serial.println(firebaseData.errorReason());
  } 
}
