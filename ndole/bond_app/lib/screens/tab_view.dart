import 'package:bond_app/const_values.dart';
import 'package:bond_app/screens/add_partner.dart';
import 'package:bond_app/screens/user_profile.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class TabView extends StatefulWidget {
  @override
  _TabViewState createState() => _TabViewState();
}

class _TabViewState extends State<TabView> {
  final List<Map<String, Object>> _pages = [
    {
      // we will do the checking for if the user has a partner or not
      // then push to to HomeScreen() else Push to AddPartnerScreen()
      // using a ternary operator
      'page': AddPartnerScreen(),
      'title': 'Categories',
    },
    {
      'page': UserProfile(),
      'title': 'Your Favorite',
    },
  ];
  int _selectedPageIndex = 0;

  void _selectPage(int index) {
    setState(() {
      _selectedPageIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _pages[_selectedPageIndex]['page'],
      bottomNavigationBar: BottomNavigationBar(
        onTap: _selectPage,
        currentIndex: _selectedPageIndex,
        selectedIconTheme: IconThemeData(
          color: primaryColor,
        ),
        unselectedIconTheme: IconThemeData(
          color: Colors.grey,
        ),
        items: [
          BottomNavigationBarItem(
            label: '',
            icon: FaIcon(FontAwesomeIcons.fireAlt),
          ),
          BottomNavigationBarItem(
            label: '',
            icon: FaIcon(FontAwesomeIcons.userCircle),
          ),
        ],
      ),
    );
  }
}
