import 'package:bond_app/providers/theme_provider.dart';
import 'package:bond_app/services/auth.dart';
import 'package:bond_app/src/app.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);
  runApp(
    MultiProvider(
      providers: [
        StreamProvider.value(
          initialData: null,
          value: AuthService().user,
        ),
        ChangeNotifierProvider.value(
          value: ThemeProvider(),
        )
      ],
      child: App(),
    ),
  );
}
