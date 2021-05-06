import 'dart:convert';

import 'package:bond_app/const_values.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:http/http.dart' as http;

class ApiRequest {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  // request to all user data from firebase to DB
  Future authUserToDB() async {
    if (_auth.currentUser != null) {
      var req = await http.post(
        Uri.parse(authUser),
        body: {
          'uid': _auth.currentUser.uid,
          'name': _auth.currentUser.displayName,
          'username': '',
          'photo': _auth.currentUser.photoURL,
          'email': _auth.currentUser.email,
        },
      );
      var res = json.decode(req.body);
      logger.i(res);
    } else {
      logger.e('Something went wrong');
    }
  }
}
