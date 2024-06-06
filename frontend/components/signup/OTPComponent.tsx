import React from 'react';
import Button from '@mui/material/Button';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { Controller, useForm } from 'react-hook-form';
import { Box, FormHelperText } from '@mui/material';

interface FormData {
  otp: string;
}

const OTPComponent = () => {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      otp: ''
    }
  });

  const onSubmit = (data: FormData) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <Controller
        name="otp"
        control={control}
        rules={{ validate: (value: string) => value.length === 6 }}
        render={({ field, fieldState }) => (
          <Box>
            <MuiOtpInput sx={{ gap: 0.5 }} {...field} length={6} />
            {fieldState.invalid ? (
              <FormHelperText error>OTP invalid</FormHelperText>
            ) : null}
          </Box>
        )}
      />
      <div>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default OTPComponent;