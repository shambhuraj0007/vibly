"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Page = () => {
  const registerSchema = yup.object().shape({
    username: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    dateOfBirth: yup.date().required("Birth date is required"),
    gender: yup.string().oneOf(["male", "female", "other"], "Please select a gender").required("Gender is required"),
  });

  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    reset: resetLoginForm,
    formState: { errors: errorsLogin },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    reset: resetSignUpForm,
    formState: { errors: errorsSignUp },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmitRegister = (data) => {
    console.log("Register data", data);
  };

  const onSubmitLogin = (data) => {
    console.log("Login data", data);
  };

  useEffect(() => {
    resetLoginForm();
    resetSignUpForm();
  }, [resetLoginForm, resetSignUpForm]);

  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4 pt-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-6xl dark:text-white p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-red-400 to-10%">꧁𓊈𒆜<b className="text-4xl text-blue-400">🆅</b>🅸🅱🅻🆈𒆜𓊉<i className="text-black text-sm">by Shambhuraj</i></CardTitle>
            <CardDescription className="text-center">
              Connect with friends and vibe with the world with vibly
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleSubmitLogin(onSubmitLogin)}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="loginEmail">Email</Label>
                      <Input
                        id="loginEmail"
                        type="email"
                        {...registerLogin("email")}
                        placeholder="Enter your email"
                      />
                      {errorsLogin.email && (
                        <p className="text-red-500 text-sm">{errorsLogin.email.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loginPassword">Password</Label>
                      <Input
                        id="loginPassword"
                        type="password"
                        {...registerLogin("password")}
                        placeholder="Enter your Password"
                      />
                      {errorsLogin.password && (
                        <p className="text-red-500 text-sm">{errorsLogin.password.message}</p>
                      )}
                    </div>
                    <Button className="w-full cursor-pointer" type="submit">
                      <LogIn className="mr-2 w-4 h-4" /> Log in
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSubmitSignUp(onSubmitRegister)}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signupName">Username</Label>
                      <Input
                        id="signupName"
                        type="text"
                        {...registerSignUp("username")}
                        placeholder="Enter your username"
                      />
                      {errorsSignUp.username && (
                        <p className="text-red-500 text-sm">{errorsSignUp.username.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupEmail">Email</Label>
                      <Input
                        id="signupEmail"
                        type="email"
                        {...registerSignUp("email")}
                        placeholder="Enter your email"
                      />
                      {errorsSignUp.email && (
                        <p className="text-red-500 text-sm">{errorsSignUp.email.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupPassword">Password</Label>
                      <Input
                        id="signupPassword"
                        type="password"
                        {...registerSignUp("password")}
                        placeholder="Enter your Password"
                      />
                      {errorsSignUp.password && (
                        <p className="text-red-500 text-sm">{errorsSignUp.password.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupBirthday">Birthdate</Label>
                      <Input
                        id="signupBirthday"
                        type="date"
                        {...registerSignUp("dateOfBirth")}
                      />
                      {errorsSignUp.dateOfBirth && (
                        <p className="text-red-500 text-sm">{errorsSignUp.dateOfBirth.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <RadioGroup className="flex justify-between" defaultValue="male">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" {...registerSignUp("gender")} />
                          <Label htmlFor="male">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" {...registerSignUp("gender")} />
                          <Label htmlFor="female">Female</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" {...registerSignUp("gender")} />
                          <Label htmlFor="other">Other</Label>
                        </div>
                      </RadioGroup>
                      {errorsSignUp.gender && (
                        <p className="text-red-500 text-sm">{errorsSignUp.gender.message}</p>
                      )}
                    </div>
                    <Button className="w-full cursor-pointer" type="submit">
                      <LogIn className="mr-2 w-4 h-4" /> Sign Up
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Page;
