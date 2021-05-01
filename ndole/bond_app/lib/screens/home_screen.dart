import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_fonts/google_fonts.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final _formKey = GlobalKey<FormState>();
  final FirebaseAuth _auth = FirebaseAuth.instance;

  final TextEditingController _email = TextEditingController();

  showAddPartnerDialog() {
    showDialog(
      context: context,
      builder: (_) {
        return AlertDialog(
          title: Text('Add your partner'),
          content: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Container(
              // height: 250,
              child: Form(
                key: _formKey,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    TextFormField(
                      controller: _email,
                      validator: (val) {
                        if (val.isEmpty) {
                          return 'Please enter an Email';
                        } else {
                          return null;
                        }
                      },
                      decoration: InputDecoration(
                        hintText: "Partner's Email *",
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: Text('CLOSE'),
            ),
            TextButton(
              onPressed: () {
                var form = _formKey.currentState;
                if (form.validate()) {
                  Navigator.pop(context);
                }
              },
              child: Text('SEND INVITE'),
            ),
          ],
        );
      },
    );
  }

  // function to get only first name
  String getOnlyFirstName() {
    var mainFromFirebase = _auth.currentUser.displayName;
    String firstUserName =
        mainFromFirebase.substring(0, mainFromFirebase.indexOf(' '));

    return firstUserName;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Container(
                width: 250,
                child: Stack(
                  fit: StackFit.loose,
                  children: [
                    // this is for the partner
                    Positioned(
                      left: 90,
                      child: Column(
                        children: [
                          Container(
                            height: 150,
                            width: 150,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(80),
                              border: Border.all(
                                color: Colors.grey[200],
                                style: BorderStyle.solid,
                                width: 8,
                              ),
                              // image: DecorationImage(
                              //   image: NetworkImage('${_auth.currentUser.photoURL}'),
                              //   fit: BoxFit.cover,
                              // ),
                            ),
                            child: Center(
                              child: FaIcon(FontAwesomeIcons.userCircle),
                            ),
                          ),
                          Text(
                            'Bonder',
                            style: GoogleFonts.roboto(
                              fontSize: 20,
                            ),
                            overflow: TextOverflow.fade,
                            textAlign: TextAlign.center,
                          )
                        ],
                      ),
                    ),
                    // partner avater ends here
                    //
                    //
                    // this is the main user avater
                    Positioned(
                      // left: 1,
                      child: Column(
                        children: [
                          Container(
                            height: 150,
                            width: 150,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(80),
                              border: Border.all(
                                color: Colors.grey[200],
                                style: BorderStyle.solid,
                                width: 8,
                              ),
                              image: DecorationImage(
                                image: NetworkImage(
                                    '${_auth.currentUser.photoURL}'),
                                fit: BoxFit.cover,
                              ),
                            ),
                          ),
                          Text(
                            getOnlyFirstName(),
                            style: GoogleFonts.roboto(
                              fontSize: 20,
                            ),
                            overflow: TextOverflow.fade,
                            textAlign: TextAlign.center,
                          )
                        ],
                      ),
                    ),
                    // ends here
                    //
                    //
                  ],
                ),
              ),
              SizedBox(
                height: 50,
              ),
              // love/like button
              InkWell(
                onTap: () {},
                child: Image.asset(
                  'assets/icons/Like.png',
                  fit: BoxFit.cover,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
