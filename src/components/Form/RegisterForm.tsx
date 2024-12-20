import { useRegisterForm } from '@/hooks/useRegisterForm'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form" 
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button"; 
import CheckTrigger from "@/components/CheckedTrigger/CheckTrigger" 
import PasswordStatusBar from "@/components/PasswordStrength/PasswordStatusBar" 

const RegisterForm = () => {
  const { form, error, isButtonDisabled, handleButtonEnable, registerUser } = useRegisterForm();

  return (
    <Form {...form}>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <form
        onSubmit={form.handleSubmit(registerUser)}
        className="flex flex-col md:flex-row gap-5 w-full items-start rounded-2xl px-6 md:px-14 py-6 shadow-lg"
      >
        <div className="w-full md:w-[60%]">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Type your password here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                {field.value && <PasswordStatusBar currentPwd={field.value} />}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="retypePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-type Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Re-type your password here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                {field.value && <PasswordStatusBar currentPwd={field.value} />}
              </FormItem>
            )}
          />
        </div>

        <div className="w-full md:w-[40%] space-y-3 mt-10">
          <CheckTrigger onSuccess={handleButtonEnable} />
          <Button disabled={isButtonDisabled} className="mt-4" type="submit">
            Register
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
