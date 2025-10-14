import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:ui/models/user.dart';
import 'package:ui/poviders/user_provider.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => UserProvider(),
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "Flutter CRUD + API",
      home: const UserScreen(),
    );
  }
}

class UserScreen extends StatefulWidget {
  const UserScreen({super.key});

  @override
  State<UserScreen> createState() => _UserScreenState();
}

class _UserScreenState extends State<UserScreen> {
  void _showUserDialog(BuildContext context, {User? user}) {
    final nameCtrl = TextEditingController(text: user?.name ?? "Niraj");
    final emailCtrl = TextEditingController(text: user?.email ?? "niraj.kc.128@gmail.com");
    showDialog(
      context: context,
      builder: (_) =>
          AlertDialog(
            title: Text(user == null ? "Add User" : "Edit User"),
            content: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(controller: nameCtrl, decoration: const InputDecoration(labelText: "Name")),
                TextField(controller: emailCtrl, decoration: const InputDecoration(labelText: "Email")),
              ],
            ),
            actions: [
              TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: const Text("Cancel")),
              ElevatedButton(
                onPressed: () {
                  final provider = context.read<UserProvider>();
                  if (user == null) {
                    provider.addUser(User(
                      id: DateTime
                          .now()
                          .millisecondsSinceEpoch,
                      name: nameCtrl.text,
                      email: emailCtrl.text,
                    ));
                  } else {
                    user.name = nameCtrl.text;
                    user.email = emailCtrl.text;
                    provider.updateUser(user);
                  }
                  Navigator.pop(context);
                },
                child: const Text("Save"),
              )
            ],
          ),
    );
  }


  @override
  Widget build(BuildContext context) {
    final provider = context.watch<UserProvider>();
    return Scaffold(
      appBar: AppBar(title: const Text("Users CRUD")),
      body: FutureBuilder(
          future: provider.fetchUsers(),
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(child: CircularProgressIndicator());
            } else if (snapshot.hasError) {
              return Center(child: Text("Error: ${snapshot.error}"));
            } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
              return const Center(child: Text("No users found"));
            }

            List<User> users = snapshot.data!;
            print(users);

            return ListView.builder(
              itemCount: users.length,
              itemBuilder: (_, i) {
                final user = users[i];
                return ListTile(
                  title: Text(user.name),
                  subtitle: Text(user.email),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(icon: const Icon(Icons.edit), onPressed: () => _showUserDialog(context, user: user)),
                      IconButton(
                          icon: const Icon(Icons.delete, color: Colors.red),
                          onPressed: () => provider.deleteUser(user.id)),
                    ],
                  ),
                );
              },
            );


          }


      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _showUserDialog(context),
        child: const Icon(Icons.add),
      ),
    );
  }
}
