"use client"

import { useState } from 'react'
import { usePasswordStrength } from '../hooks/usePasswordStrength'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Sun, Moon, Copy, RefreshCw } from 'lucide-react'

const samplePasswords = [
  "Tr0ub4dor&3",
  "correcthorsebatterystaple",
  "ILovePizza!2023",
  "P@ssw0rd123!",
  "Th1s1s@Str0ngP@ssw0rd"
];

export function PasswordStrengthTool() {
  const [password, setPassword] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const { score, feedback, suggestions } = usePasswordStrength(password)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const copyPassword = () => {
    navigator.clipboard.writeText(password)
  }

  const generatePassword = () => {
    const randomIndex = Math.floor(Math.random() * samplePasswords.length)
    setPassword(samplePasswords[randomIndex])
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-r ${darkMode ? 'from-gray-900 to-gray-700' : 'from-blue-100 to-purple-100'} transition-colors duration-500`}>
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold">Password Strength Meter</CardTitle>
            <Switch
              checked={darkMode}
              onCheckedChange={toggleDarkMode}
              className="ml-4"
            >
              <span className="sr-only">Toggle dark mode</span>
              {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Switch>
          </div>
          <CardDescription>Check the strength of your password and get suggestions for improvement.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={copyPassword} variant="outline" size="icon">
              <Copy className="h-4 w-4" />
            </Button>
            <Button onClick={generatePassword} variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-64">
            <ChartContainer
              config={{
                strength: {
                  label: "Strength",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{ strength: score }]}>
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="strength" fill="var(--color-strength)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div>
            <Label className="text-lg font-semibold">Feedback:</Label>
            <ul className="list-disc list-inside">
              {feedback.map((item, index) => (
                <li key={index} className="text-green-600">{item}</li>
              ))}
            </ul>
          </div>
          {suggestions.length > 0 && (
            <div>
              <Label className="text-lg font-semibold">Suggestions:</Label>
              <ul className="list-disc list-inside">
                {suggestions.map((item, index) => (
                  <li key={index} className="text-orange-500">{item}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            Tip: A strong password is long, uses a mix of characters, and is unique for each account.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

