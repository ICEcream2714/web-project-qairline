import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function HomePage() {
  const { toast } = useToast();
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="justify-center">
      <div className="w-90 flex flex-col items-center justify-center">
        <Toaster />
        <h1
          className="w-full bg-blue-800 text-center text-5xl text-white"
          style={{ padding: "50px" }}
        >
          HomePage
        </h1>
        <Button
          className=""
          onClick={() => {
            toast({
              description: "Your message has been sent.",
            });
          }}
        >
          Click me
        </Button>
        <Accordion type="single" collapsible className="w-full p-5">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the cli.
          </AlertDescription>
        </Alert>
        <Button
          variant="outline"
          onClick={() => navigate("/login")} // Navigate to LoginPage on click
        >
          Go to Login
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
