gnome-terminal --window-with-profile=Tyler --title="Packager" -- npm run android:dev
gnome-terminal --tab-with-profile=Tyler --title="Builder" -- react-native start
gnome-terminal --tab-with-profile=Tyler --title="Android Logger" -- react-native log-android
adb reverse tcp:1337 tcp:1337