import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useGoogleLogin } from '@react-oauth/google';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import { useAuthContext } from 'src/auth/hooks';
import {
  USE_FRONTEND_ONLY_AUTH,
  MOCK_PORTAL_USERS,
  findMockPortalUser,
  createUnsignedMockJwt,
} from 'src/utils/mock-portal-credentials';
import {
  PATH_AFTER_LOGIN,
  PATH_AFTER_LOGIN_COMPANY,
  PATH_AFTER_LOGIN_EMPLOYEE,
  PATH_AFTER_LOGIN_NEW_USER,
  PATH_AFTER_LOGIN_SUPER,
} from 'src/config-global';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { loginWithFrontendMock } = useAuthContext();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    username: 'company',
    password: 'company123',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (USE_FRONTEND_ONLY_AUTH) {
        const mockUser = findMockPortalUser(data.username, data.password);
        if (!mockUser) {
          setErrorMsg('Unknown user or wrong password (frontend mock only).');
          return;
        }
        const token = createUnsignedMockJwt({
          username: mockUser.username,
          role: mockUser.userType,
        });
        sessionStorage.setItem('username', mockUser.username);
        sessionStorage.setItem('userType', mockUser.userType);
        sessionStorage.setItem('email', mockUser.email);
        loginWithFrontendMock(token, { username: mockUser.username, email: mockUser.email });

        if (mockUser.userType === 'co') {
          router.push(PATH_AFTER_LOGIN_COMPANY);
        } else if (mockUser.userType === 'sa') {
          router.push(PATH_AFTER_LOGIN_SUPER);
        } else if (
          [
            'Candidate_interview',
            'Candidate_Performance',
            'Candidate_interview_Performance',
            'cj',
          ].includes(mockUser.userType)
        ) {
          router.push(PATH_AFTER_LOGIN_EMPLOYEE);
        } else if (mockUser.userType === 'rc') {
          router.push(PATH_AFTER_LOGIN_NEW_USER);
        } else {
          router.push(PATH_AFTER_LOGIN);
        }
        return;
      }

      /* Backend login (disabled while running frontend-only)
      const response = await fetch('http://localhost:5161/api/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();

        if (responseData.code === '404') {
          setErrorMsg(typeof error === 'string' ? error : responseData.message);
        } else {
          sessionStorage.setItem('username', responseData.data[0].username);
          sessionStorage.setItem('userType', responseData.data[0].userType);
          sessionStorage.setItem('email', responseData.data[0].email);
          await login?.(data.username, data.password);
          setAuthToken(responseData.data[0].token);
          if (responseData.data[0].userType == 'co') {
            router.push(PATH_AFTER_LOGIN_COMPANY);
          } else if (responseData.data[0].userType == 'sa') {
            router.push(PATH_AFTER_LOGIN_SUPER);
          } else if (
            [
              'Candidate_interview',
              'Candidate_Performance',
              'Candidate_interview_Performance',
              'cj',
            ].includes(responseData.data[0].userType)
          ) {
            router.push(PATH_AFTER_LOGIN_EMPLOYEE);
          } else if (responseData.data[0].userType == 'rc') {
            router.push(PATH_AFTER_LOGIN_NEW_USER);
          } else {
            throw new Error('Failed to login. Please check your credentials.');
          }
        }
      }
      */
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  // Google login calls backend — disabled for frontend-only mock auth.
  const handleGoogleSuccess = async () => {
    setErrorMsg('Google sign-in is turned off while using frontend-only mock login.');
  };

  /*
  const handleGoogleSuccess = async (response) => {
    const accessToken = response.access_token;

    try {
      const roleResponse = await fetch('http://localhost:5161/api/Login/LoginWithGoogle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken,
        }),
      });

      if (roleResponse.ok) {
        const responseData = await roleResponse.json();

        if (responseData.code === '404') {
          setErrorMsg(typeof error === 'string' ? error : responseData.message);
        } else {
          sessionStorage.setItem('username', responseData.data[0].username);
          sessionStorage.setItem('userType', responseData.data[0].userType);
          sessionStorage.setItem('email', responseData.data[0].email);
          await login?.(responseData.data[0].username, '123');
          setAuthToken(responseData.data[0].token);
          if (responseData.data[0].userType == 'co') {
            router.push(PATH_AFTER_LOGIN_COMPANY);
          } else if (responseData.data[0].userType == 'sa') {
            router.push(PATH_AFTER_LOGIN_SUPER);
          } else if (
            [
              'Candidate_interview',
              'Candidate_Performance',
              'Candidate_interview_Performance',
              'cj',
            ].includes(responseData.data[0].userType)
          ) {
            router.push(PATH_AFTER_LOGIN_EMPLOYEE);
          } else if (responseData.data[0].userType == 'rc') {
            router.push(PATH_AFTER_LOGIN_NEW_USER);
          } else {
            throw new Error('Failed to login. Please check your credentials.');
          }
        }
      } else {
        throw new Error('Failed to login. Please check your credentials.');
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('Google login failed. Please try again.');
    }
  };
  */

  const handleGoogleError = () => {
    setErrorMsg('Google Login Failed.');
  };

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Sign in to Employee Ease</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">New Candidate?</Typography>

        <Link component={RouterLink} href={paths.auth.jwt.registerCandidate} variant="subtitle2">
          Create an account
        </Link>
      </Stack>
    </Stack>
  );

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
  });

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField name="username" label="User Name" />

      <RHFTextField
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Link
        component={RouterLink}
        href={paths.authDemo.classic.forgotPassword2}
        variant="body2"
        color="inherit"
        underline="always"
        sx={{ alignSelf: 'flex-end' }}
      >
        Forgot password?
      </Link>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>

      {/* Google Login Button */}
      <Button
        type="button"
        onClick={() => googleLogin()}
        startIcon={<Iconify icon="flat-color-icons:google" />}
      >
        Login with Google
      </Button>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      <Alert severity="info" sx={{ mb: 3 }}>
        Frontend-only mock accounts (no API):{' '}
        {MOCK_PORTAL_USERS.map((u) => (
          <span key={u.username}>
            <strong>{u.username}</strong> / <strong>{u.password}</strong> ({u.userType}) —{' '}
          </span>
        ))}
      </Alert>

      {renderForm}
    </FormProvider>
  );
}
