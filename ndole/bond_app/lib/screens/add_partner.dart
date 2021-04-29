import 'package:bond_app/utils/default_button.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AddPartnerScreen extends StatefulWidget {
  @override
  _AddPartnerScreenState createState() => _AddPartnerScreenState();
}

class _AddPartnerScreenState extends State<AddPartnerScreen> {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(
                'Add your partner to get Strated',
                style: GoogleFonts.roboto(
                  fontSize: 20,
                  color: Colors.black45,
                ),
              ),
              SizedBox(
                height: 50,
              ),
              Container(
                height: 150,
                width: 150,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(80),
                  image: DecorationImage(
                    image: NetworkImage('${_auth.currentUser.photoURL}'),
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              SizedBox(
                height: 35,
              ),
              Text(
                'You',
                style: GoogleFonts.roboto(
                  fontSize: 20,
                  color: Colors.black45,
                ),
              ),
              SizedBox(
                height: 30,
              ),
              DefaultButton(
                title: 'Add Partner',
                onPress: () {},
              ),
            ],
          ),
        ),
      ),
    );
  }
}
