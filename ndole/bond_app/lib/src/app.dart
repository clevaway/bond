import 'package:bond_app/custom_theme.dart';
import 'package:bond_app/src/splash_screen.dart';
import 'package:flutter/material.dart';

class App extends StatefulWidget {
  @override
  _AppState createState() => _AppState();
}

class _AppState extends State<App> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Bond',
      theme: buildLightTheme(),
      home: SplashScreen(),
    );
  }
}
