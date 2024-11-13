import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import RegisterForm from "../Form/RegisterForm"
import LoginForm from "../Form/LoginForm"

export function TabBar() {

  return (
    <div className="flex flex-col justify-center items-center py-3 h-screen">
      <h1 className="text-lg font-bold">Registration for online portal</h1>
      <Tabs defaultValue="register" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Sign-up for your account</CardTitle>
            </CardHeader>
            <CardContent>
              <RegisterForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Sign In</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <LoginForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
