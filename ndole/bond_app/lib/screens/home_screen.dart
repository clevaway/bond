import 'package:bond_app/providers/theme_provider.dart';
import 'package:bond_app/services/auth.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final _formKey = GlobalKey<FormState>();
  final AuthService _authService = AuthService();
  final FirebaseAuth _auth = FirebaseAuth.instance;

  TextEditingController _email = TextEditingController();

  _showDialog() {
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

  @override
  Widget build(BuildContext context) {
    final checkTheme = Provider.of<ThemeProvider>(context);
    return Scaffold(
      appBar: AppBar(
        title: Text('Bond'),
        actions: [
          IconButton(
            icon: Icon(
              checkTheme.mTheme == false
                  ? Icons.brightness_3_rounded
                  : Icons.brightness_6_rounded,
              color: checkTheme.mTheme == false ? Colors.black : Colors.red,
            ),
            onPressed: () {
              checkTheme.checkTheme();
            },
          ),
          IconButton(
            icon: Icon(
              Icons.logout,
              color: Colors.red,
            ),
            onPressed: () {
              _authService.signUserOut();
            },
          ),
        ],
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.pink,
        child: Icon(
          Icons.favorite,
          color: Colors.white,
        ),
        onPressed: () {},
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
          child: Center(
            child: Column(
              children: [
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
                  height: 15,
                ),
                Text(
                  '${_auth.currentUser.displayName}',
                  style: TextStyle(
                    fontSize: 20,
                  ),
                ),
                SizedBox(
                  height: 25,
                ),
                Container(
                  child: ElevatedButton(
                    style: ButtonStyle(
                        backgroundColor: MaterialStateProperty.resolveWith(
                      (states) => Colors.pink,
                    )),
                    onPressed: () {
                      _showDialog();
                    },
                    child: Text(
                      'ADD PARTNER',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
                SizedBox(
                  height: 25,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
