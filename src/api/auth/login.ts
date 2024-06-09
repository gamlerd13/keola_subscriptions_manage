import axios, { AxiosResponse } from 'axios';
import { LoginCredentials, LoginResponse } from '../../models/login';
import { environment } from '../../environmen'

// const authenticateUser = async (credentials: LoginCredentials) =>{
//     try {
//         const response: AxiosResponse<LoginResponse> = await axios.post("", credentials);
//         return response.data;
//       } catch (error) {
//         if (axios.isAxiosError(error)) {
//           throw new Error(`Login failed: ${error.response?.data.message || error.message}`);
//         } else {
//           throw new Error('An unexpected error occurred');
//         }
// }
// }
// export default authenticateUser

class AuthService {
  private apiUrl = environment.apiUrl

  public async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response: AxiosResponse<LoginResponse> = await axios.post(
        this.apiUrl,
        credentials
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Login failed: ${error.response?.data.message || error.message}`
        );
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }
}

export default AuthService;
