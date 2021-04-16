import 'package:bond_app/auth/wrapper.dart';
import 'package:bond_app/custom_theme.dart';
import 'package:bond_app/providers/theme_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class App extends StatefulWidget {
  @override
  _AppState createState() => _AppState();
}

class _AppState extends State<App> {
  @override
  Widget build(BuildContext context) {
    final checkTheme = Provider.of<ThemeProvider>(context);
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Bond',
      theme: checkTheme.mTheme == false ? buildLightTheme() : buildDarkTheme(),
      home: Wrapper(),
    );
  }
}
