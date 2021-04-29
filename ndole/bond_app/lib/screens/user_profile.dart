import 'package:bond_app/const_values.dart';
import 'package:bond_app/services/auth.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class UserProfile extends StatefulWidget {
  @override
  _UserProfileState createState() => _UserProfileState();
}

class _UserProfileState extends State<UserProfile> {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final AuthService _authService = AuthService();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Stack(
                children: [
                  Container(
                    height: 300,
                    width: MediaQuery.of(context).size.width,
                  ),
                  Positioned(
                    top: 50,
                    right: 1,
                    left: 1,
                    child: Column(
                      children: [
                        Container(
                          height: 134,
                          width: 134,
                          child: CircleAvatar(
                            backgroundColor: Colors.grey[200],
                            backgroundImage:
                                NetworkImage('${_auth.currentUser.photoURL}'),
                            // child: ,
                          ),
                        ),
                        SizedBox(
                          height: 30,
                        ),
                        Text(
                          '${_auth.currentUser.displayName}',
                          style: GoogleFonts.nunito(
                            fontSize: 20,
                          ),
                        )
                      ],
                    ),
                  ),
                  Positioned(
                    top: 150,
                    right: 130,
                    child: InkWell(
                      onTap: () {},
                      child: Container(
                        child: Image.asset('assets/icons/addImage.png'),
                      ),
                    ),
                  ),
                ],
              ),
              Divider(
                thickness: 8,
              ),
              SizedBox(
                height: 20,
              ),
              Text(
                'About',
                style: GoogleFonts.nunito(
                  fontSize: 21,
                  color: primaryColor,
                ),
              ),
              SizedBox(
                height: 20,
              ),
              Text(
                'Full Name',
                style: GoogleFonts.nunito(
                  fontSize: 18,
                  color: Colors.grey,
                ),
              ),
              Text(
                '${_auth.currentUser.displayName}',
                style: GoogleFonts.nunito(
                  fontSize: 18,
                ),
              ),
              SizedBox(
                height: 10,
              ),
              Divider(
                color: Colors.black45,
              ),
              SizedBox(
                height: 10,
              ),
              Text(
                'Email',
                style: GoogleFonts.nunito(
                  fontSize: 18,
                  color: Colors.grey,
                ),
              ),
              Text(
                '${_auth.currentUser.email}',
                style: GoogleFonts.nunito(
                  fontSize: 18,
                ),
              ),
              SizedBox(
                height: 10,
              ),
              Divider(
                color: Colors.black45,
              ),
              SizedBox(
                height: 10,
              ),
              ListTile(
                leading: Icon(
                  Icons.logout,
                  color: primaryColor,
                ),
                title: Text(
                  'Sign out',
                ),
                onTap: () {
                  _authService.signUserOut();
                },
              )
            ],
          ),
        ),
      ),
    );
  }
}
