import 'package:bond_app/auth/wrapper.dart';
import 'package:bond_app/const_values.dart';
import 'package:flutter/material.dart';

class SplashScreen extends StatefulWidget {
  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    Future.delayed(Duration(seconds: 4), () {
      Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (_) {
        return Wrapper();
      }));
    });
  }

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Container(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset(
              'assets/logo/bond_logo.png',
              width: 150,
              height: 150,
            ),
            Text(
              'Bond',
              style: TextStyle(
                fontSize: 30,
                color: primaryColor,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(
              height: 15,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'Keep connected, ',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 20,
                  ),
                ),
                Text(
                  'And you\'ll',
                  style: TextStyle(
                    fontSize: 20,
                  ),
                ),
              ],
            ),
            Text(
              'always stay in touch',
              style: TextStyle(
                fontSize: 20,
              ),
            )
          ],
        ),
      ),
    );
  }
}
