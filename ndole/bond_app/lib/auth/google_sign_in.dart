import 'package:bond_app/services/auth.dart';
import 'package:flutter/material.dart';

class GoogleSignInScreen extends StatefulWidget {
  @override
  _GoogleSignInScreenState createState() => _GoogleSignInScreenState();
}

class _GoogleSignInScreenState extends State<GoogleSignInScreen> {
  final AuthService _authService = AuthService();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Center(
            child: InkWell(
              onTap: () {
                _authService.signUpWithGoogle(context);
              },
              child: Container(
                height: 40,
                width: 220,
                decoration: BoxDecoration(
                  color: Colors.grey[200],
                  borderRadius: BorderRadius.circular(30),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Image.asset(
                      'assets/logo/google_logo.png',
                      height: 50,
                      width: 50,
                    ),
                    Text(
                      'Sign in with Google',
                    )
                  ],
                ),
              ),
            ),
          )),
    );
  }
}
