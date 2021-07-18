import 'package:bond_app/const_values.dart';
import 'package:flutter/material.dart';

class DefaultButton extends StatelessWidget {
  final String? title;
  final VoidCallback? onPress;

  DefaultButton({
    Key? key,
    @required this.title,
    @required this.onPress,
  }) : super(key: key);

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
        onPressed: onPress,
        child: Text(
          title!,
          style: TextStyle(
            color: Colors.white,
          ),
        ),
      ),
    );
  }
}
