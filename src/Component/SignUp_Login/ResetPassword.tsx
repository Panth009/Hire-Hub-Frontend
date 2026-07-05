import { Button, Modal, PasswordInput, PinInput, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { useInterval } from "@mantine/hooks";
import { changePass, sendotp, verifyotp } from "../../Services/UserService";
import { signUpValidation } from "../../Services/FormValidations";
import { errorNotification, successNotification } from "../../Services/NotificationService";

const ResetPassword = (props: any) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passError, setPassError] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpSending, setOtpSending] = useState(false);
    const [verified, setVerified] = useState(false);
    const [resendLoader, setResendLoader] = useState(false);
    const [seconds, setSeconds] = useState(60);

    const interval = useInterval(() => {
        if (seconds === 0) {
            setResendLoader(false);
            setSeconds(60);
            interval.stop();
        } else {
            setSeconds((s) => s - 1);
        }
    }, 1000);

    const handleSendOtp = () => {
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            errorNotification("Invalid Email", "Please enter a valid email address");
            return;
        }
        setOtpSending(true);
        sendotp(email).then((res: any) => {
            setOtpSent(true);
            successNotification("OTP Sent", "Please check your email for the OTP");
            setOtpSending(false);
            setResendLoader(true);
            interval.start();
        }).catch((err: any) => {
            setOtpSending(false);
            errorNotification("OTP Sending Failed", err.response.data.errorMessage);
        });
    }

    const handleVerifyOtp = (otp: string) => {
        verifyotp(email, otp).then((res: any) => {
            successNotification("OTP Verified", "Enter your new password");
            setVerified(true);
        }).catch((err: any) => {
            errorNotification("OTP Verification Failed", err.response.data.errorMessage);
        });
    }

    const resendOtp = () => {
        if (resendLoader) return;
        handleSendOtp();
    }

    const changeEmail = () => {
        setOtpSent(false);
        setResendLoader(false);
        setSeconds(60);
        setVerified(false);
        interval.stop();
    }

    const handleResetPassword = () => {
        if (passError) return;
        changePass(email, password).then((res: any) => {
            successNotification("Password Changed", "Login with your new password");
            props.close();
        }).catch((err: any) => {
            errorNotification("Password Reset Failed", err.response.data.errorMessage);
        });
    }

    return (
        <Modal opened={props.opened} onClose={props.close} title="Reset Password">
            <div className="flex flex-col gap-5">

                <TextInput
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={otpSent}
                    name="email"
                    placeholder="Your email"
                    size="md"
                    leftSection={<IconAt size={16} />}
                    rightSection={
                        <Button
                            loading={otpSending && !otpSent}
                            onClick={handleSendOtp}
                            disabled={email === "" || otpSent}
                            size="xs"
                            className="mr-1"
                            variant="filled"
                        >
                            Send OTP
                        </Button>
                    }
                    rightSectionWidth="xl"
                />

                {otpSent && (
                    <PinInput
                        onComplete={handleVerifyOtp}
                        type="number"
                        length={6}
                        className="mx-auto"
                        size="md"
                        gap="lg"
                    />
                )}

                {otpSent && !verified && (
                    <div className="flex gap-2">
                        <Button fullWidth loading={otpSending} onClick={resendOtp} variant="light">
                            {resendLoader ? seconds : "Resend OTP"}
                        </Button>
                        <Button fullWidth onClick={changeEmail} autoContrast variant="filled">
                            Change Email
                        </Button>
                    </div>
                )}

                {verified && (
                    <PasswordInput
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setPassError(signUpValidation("password", e.target.value));
                        }}
                        name="password"
                        error={passError}
                        withAsterisk
                        leftSection={<IconLock size={18} stroke={1.5} />}
                        label="New Password"
                        placeholder="Strong password"
                    />
                )}

                {verified && (
                    <Button onClick={handleResetPassword} autoContrast variant="filled">
                        Reset Password
                    </Button>
                )}

            </div>
        </Modal>
    );
}

export default ResetPassword;