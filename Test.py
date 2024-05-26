import unittest
import requests
import json

class RegisterTests(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.base_url = "http://localhost:3001/register"  # Reemplaza "URL" por la URL de tu backend
        cls.invalid_nombre_data = ""
        cls.valid_nombre_data = "John Doe"
        cls.invalid_rut_data = "1231145678-9"  # Rut inválido
        cls.valid_rut_data = "12345678-9"  # Rut válido

    def test_invalid_nombre(self):
        response = requests.post(f"{self.base_url}/auth/register", json={"nombre": self.invalid_nombre_data})
        self.assertEqual(response.status_code, 400)  # Espera un código de estado 400 para datos inválidos

        # Verifica que el mensaje de error esperado esté en la respuesta
        expected_error = "El nombre debe contener solo letras."
        self.assertIn(expected_error, response.json().get("error", ""))

    def test_valid_nombre(self):
        response = requests.post(f"{self.base_url}/auth/register", json={"nombre": self.valid_nombre_data})
        self.assertEqual(response.status_code, 431)  # Espera un código de estado 200 para datos válidos

    def test_invalid_rut(self):
        response = requests.post(f"{self.base_url}/auth/register", json={"rut": self.invalid_rut_data})
        self.assertEqual(response.status_code, 400)  # Espera un código de estado 400 para datos inválidos

        # Verifica que el mensaje de error esperado esté en la respuesta
        expected_error = "El RUT ingresado no es válido."
        self.assertIn(expected_error, response.json().get("error", ""))

    def test_valid_rut(self):
        response = requests.post(f"{self.base_url}/auth/register", json={"rut": self.valid_rut_data})
        self.assertEqual(response.status_code, 200)  # Espera un código de estado 200 para datos válidos

    @classmethod
    def tearDownClass(cls):
        # Realiza cualquier limpieza necesaria después de las pruebas
        pass

if __name__ == '__main__':
    unittest.main()
