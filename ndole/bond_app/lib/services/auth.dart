import 'package:another_flushbar/flushbar.dart';
import 'package:bond_app/models/user_models.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';

class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  //create user object based on firebase user
  UserModels _userFromFirebaseUser(User user) {
    return user != null ? UserModels(uid: user.uid) : null;
  }

  //auth change user stream
  Stream<UserModels> get user {
    return _auth.authStateChanges().map(_userFromFirebaseUser);
  }

  //sign in with Google
  Future signUpWithGoogle(context) async {
    try {
      // Trigger the authentication flow
      final GoogleSignInAccount googleUser = await GoogleSignIn().signIn();

      // Obtain the auth details from the request
      final GoogleSignInAuthentication googleAuth =
          await googleUser.authentication;

      // Create a new credential
      final GoogleAuthCredential credential = GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );

      await _auth.signInWithCredential(credential).then((result) {
        User user = result.user;
        return _userFromFirebaseUser(user);
      }).catchError((err) {
        print('${err.toString()}.................');
        if (err.code == 'user-not-found') {
          final flushBar = Flushbar(
            message: 'No user found for that email.',
            duration: Duration(seconds: 7),
          );
          flushBar.show(context);
        } else {
          final flushBar = Flushbar(
            message: 'Internal Error: Something went wrong.',
            duration: Duration(seconds: 7),
          );
          flushBar.show(context);
        }
      });
    } catch (error) {
      print('${error.toString()}.................');
      return null;
    }
  }

  // signing user out
  Future signUserOut() async {
    try {
      await _auth.signOut();
    } catch (e) {
      print(e.toString());
      return null;
    }
  }
}
