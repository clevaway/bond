import 'package:bond_app/const_values.dart';
import 'package:flutter/material.dart';

class DefaultButton extends StatefulWidget {
  final String title;
  final Function onPress;

  DefaultButton({
    @required this.title,
    @required this.onPress,
  });
  @override
  _DefaultButtonState createState() => _DefaultButtonState();
}

class _DefaultButtonState extends State<DefaultButton> {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 40,
      width: 150,
      decoration: BoxDecoration(
        color: primaryColor,
        borderRadius: BorderRadius.circular(30),
      ),
      child: TextButton(
        style: ButtonStyle(),
        onPressed: widget.onPress,
        child: Text(
          widget.title,
          style: TextStyle(
            color: Colors.white,
          ),
        ),
      ),
    );
  }
}
