cd android
./gradlew assembleRelease
cd ..
NODE_ENV=production react-native run-android --variant=release