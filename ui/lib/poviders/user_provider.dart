import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../models/user.dart';

class UserProvider extends ChangeNotifier {
  List<User> _users = [];

  List<User> get users => _users;

  static const String baseUrl = "http://localhost:8000/api/v1/users";
  // Replace with your external API

  /// Load initial users (can also call API)
  Future<List<User>> fetchUsers() async {
    final response = await http.get(Uri.parse(baseUrl));

    if (response.statusCode == 200) {
      final List<dynamic> data = jsonDecode(response.body);
      return data.map((json) => User.fromJson(json)).toList();
    } else {
      throw Exception("Failed to load users");
    }
  }

  Future<void> addUser(User user) async {
    // Example POST
    await http.post(Uri.parse(baseUrl),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode(user.toJson()));
    _users.add(user);
    notifyListeners();
  }

  Future<void> updateUser(User user) async {
    // Example PUT
    await http.put(Uri.parse("$baseUrl/${user.id}"),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode(user.toJson()));
    int index = _users.indexWhere((u) => u.id == user.id);
    if (index != -1) {
      _users[index] = user;
      notifyListeners();
    }
  }

  Future<void> deleteUser(int id) async {
    await http.delete(Uri.parse("$baseUrl/$id"));
    _users.removeWhere((u) => u.id == id);
    notifyListeners();
  }
}
