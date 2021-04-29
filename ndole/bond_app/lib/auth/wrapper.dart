import 'package:bond_app/auth/google_sign_in.dart';
import 'package:bond_app/models/user_models.dart';
import 'package:bond_app/screens/tab_view.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class Wrapper extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final user = Provider.of<UserModels>(context);
    if (user == null) {
      return GoogleSignInScreen();
    } else {
      return TabView();
    }
  }
}
