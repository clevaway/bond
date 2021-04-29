import 'package:bond_app/const_values.dart';
import 'package:flutter/material.dart';

ThemeData buildLightTheme() => ThemeData.light().copyWith(
      cardColor: Colors.white,
      backgroundColor: Colors.grey[100],
      primaryColor: primaryColor,
      accentColor: Colors.grey[800],
      scaffoldBackgroundColor: Colors.white,
      dividerColor: dividerColor,
      appBarTheme: AppBarTheme(
        centerTitle: true,
        brightness: Brightness.dark,
        elevation: 0.0,
        color: textLight,
        textTheme: TextTheme(
          headline6: TextStyle(
            color: Colors.black,
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        iconTheme: IconThemeData(
          color: Colors.grey[900],
        ),
      ),
      textTheme: Typography.blackCupertino,
    );

ThemeData buildDarkTheme() => ThemeData.dark().copyWith(
      cardColor: Colors.grey[850],
      backgroundColor: Colors.grey[900],
      accentColor: Colors.grey[400],
      appBarTheme: AppBarTheme(
        centerTitle: true,
        brightness: Brightness.dark,
        elevation: 0.0,
        textTheme: TextTheme(
          headline6: TextStyle(
            color: Colors.white,
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        color: Colors.grey[900],
        iconTheme: IconThemeData(
          color: Colors.grey[400],
        ),
      ),
      textTheme: Typography.whiteCupertino,
    );
