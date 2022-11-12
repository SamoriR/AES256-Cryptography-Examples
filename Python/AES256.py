from hashlib import md5
from base64 import b64decode, b64encode
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad, unpad

class AESCipher:

    def init (self, key):
        self.key = md5(key.encode('utf8')).hexdigest().encode('utf-8')

    def encrypt(self, data, iv):
        padded_data = pad (data.encode(), AES.block_size)
        aes_cipher = AES.new(self.key, AES.MODE_CBC, iv)
        encrypted_data = aes_cipher.encrypt(padded_data)
        return b64encode(encrypted_data)

    def decrypt(self, data, iv):
        encrypted_data = b64decode(data)
        aes_cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return unpad(aes_cipher.decrypt(encrypted_data), AES.block_size)
