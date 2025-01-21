"use client"

import { useState, useEffect } from 'react'
import { useAdvancedPasswordStrength } from '../hooks/useAdvancedPasswordStrength'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Sun, Moon, Copy, RefreshCw, Info, Trophy, History } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CharacterBreakdownChart } from './CharacterBreakdownChart'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

const samplePassphrases = [
  "correct horse battery staple",
  "uncommon words strung together",
  "four random common words",
  "unique phrase you remember",
  "long sentence as passphrase"
];

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
];

const translations = {
  en: {
    title: 'Advanced Password Strength Meter',
    description: 'Assess your password strength with advanced security metrics.',
    enterPassword: 'Enter your password or passphrase',
    strength: 'Strength',
    entropy: 'Entropy',
    bruteForce: 'Brute Force Resistance',
    feedback: 'Feedback',
    suggestions: 'Suggestions',
    tip: 'Tip: Consider using a passphrase - a sequence of random words. It\'s easier to remember and can be very strong.',
    characterBreakdown: 'Character Breakdown',
    passwordHistory: 'Password History',
    achievements: 'Achievements',
  },
  es: {
    title: 'Medidor Avanzado de Fortaleza de Contraseña',
    description: 'Evalúe la fortaleza de su contraseña con métricas de seguridad avanzadas.',
    enterPassword: 'Ingrese su contraseña o frase de contraseña',
    strength: 'Fortaleza',
    entropy: 'Entropía',
    bruteForce: 'Resistencia a Fuerza Bruta',
    feedback: 'Retroalimentación',
    suggestions: 'Sugerencias',
    tip: 'Consejo: Considere usar una frase de contraseña - una secuencia de palabras aleatorias. Es más fácil de recordar y puede ser muy fuerte.',
    characterBreakdown: 'Desglose de Caracteres',
    passwordHistory: 'Historial de Contraseñas',
    achievements: 'Logros',
  },
  fr: {
    title: 'Évaluateur Avancé de Force de Mot de Passe',
    description: 'Évaluez la force de votre mot de passe avec des métriques de sécurité avancées.',
    enterPassword: 'Entrez votre mot de passe ou phrase de passe',
    strength: 'Force',
    entropy: 'Entropie',
    bruteForce: 'Résistance à la Force Brute',
    feedback: 'Retour',
    suggestions: 'Suggestions',
    tip: 'Conseil : Envisagez d\'utiliser une phrase de passe - une séquence de mots aléatoires. C\'est plus facile à retenir et peut être très fort.',
    characterBreakdown: 'Répartition des Caractères',
    passwordHistory: 'Historique des Mots de Passe',
    achievements: 'Réalisations',
  },
  de: {
    title: 'Erweiterter Passwort-Stärke-Messer',
    description: 'Bewerten Sie Ihre Passwortstärke mit erweiterten Sicherheitsmetriken.',
    enterPassword: 'Geben Sie Ihr Passwort oder Ihre Passphrase ein',
    strength: 'Stärke',
    entropy: 'Entropie',
    bruteForce: 'Brute-Force-Widerstand',
    feedback: 'Feedback',
    suggestions: 'Vorschläge',
    tip: 'Tipp: Erwägen Sie die Verwendung einer Passphrase - eine Folge zufälliger Wörter. Sie ist leichter zu merken und kann sehr stark sein.',
    characterBreakdown: 'Zeichenaufschlüsselung',
    passwordHistory: 'Passwort-Historie',
    achievements: 'Errungenschaften',
  },
};

export function AdvancedPasswordStrengthTool() {
  const [password, setPassword] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('en')
  const [passwordHistory, setPasswordHistory] = useState<string[]>([])
  const [achievements, setAchievements] = useState<string[]>([])
  const { score, feedback, suggestions, entropy, bruteForceTime, characterBreakdown } = useAdvancedPasswordStrength(password)

  const t = translations[language as keyof typeof translations]

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const copyPassword = () => {
    navigator.clipboard.writeText(password)
  }

  const generatePassphrase = () => {
    const randomIndex = Math.floor(Math.random() * samplePassphrases.length)
    setPassword(samplePassphrases[randomIndex])
  }

  const addToHistory = () => {
    if (password && !passwordHistory.includes(password)) {
      setPasswordHistory([...passwordHistory, password])
    }
  }

  useEffect(() => {
    // Check for achievements
    const newAchievements = []
    if (score === 100 && !achievements.includes('Perfect Score')) {
      newAchievements.push('Perfect Score')
    }
    if (entropy > 100 && !achievements.includes('High Entropy')) {
      newAchievements.push('High Entropy')
    }
    if (bruteForceTime.includes('centuries') && !achievements.includes('Unbreakable')) {
      newAchievements.push('Unbreakable')
    }
    if (newAchievements.length > 0) {
      setAchievements([...achievements, ...newAchievements])
    }
  }, [score, entropy, bruteForceTime])

  const strengthData = [
    { name: 'Current', strength: score },
  ]

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-r ${darkMode ? 'from-gray-900 to-gray-700' : 'from-blue-100 to-purple-100'} transition-colors duration-500`}>
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              {t.title}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Select onValueChange={setLanguage} defaultValue={language}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Switch
                checked={darkMode}
                onCheckedChange={toggleDarkMode}
              >
                <span className="sr-only">Toggle dark mode</span>
                {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Switch>
            </div>
          </div>
          <CardDescription>{t.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 mt-4">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder={t.enterPassword}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={copyPassword} variant="outline" size="icon">
              <Copy className="h-4 w-4" />
            </Button>
            <Button onClick={generatePassphrase} variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button onClick={addToHistory} variant="outline" size="icon">
              <History className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 h-64 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg p-4">
              <ChartContainer
                config={{
                  strength: {
                    label: t.strength,
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={strengthData}>
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="strength" stroke="url(#colorGradient)" strokeWidth={3}>
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#8B5CF6" />
                          <stop offset="100%" stopColor="#EC4899" />
                        </linearGradient>
                      </defs>
                    </Line>
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-inner">
              <Label className="text-lg font-semibold flex items-center mb-2">
                {t.entropy}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 ml-2" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Entropy measures the randomness of your password. Higher is better.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <p>{entropy.toFixed(2)} bits</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-inner">
              <Label className="text-lg font-semibold flex items-center mb-2">
                {t.bruteForce}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 ml-2" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Estimated time to crack your password using brute force methods.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <p>{bruteForceTime}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-inner">
              <Label className="text-lg font-semibold mb-2">{t.characterBreakdown}</Label>
              <CharacterBreakdownChart breakdown={characterBreakdown} />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-inner">
              <Label className="text-lg font-semibold mb-2">{t.achievements}</Label>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span>{achievement}</span>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label className="text-lg font-semibold">{t.feedback}:</Label>
              <ul className="list-disc list-inside">
                {feedback.map((item, index) => (
                  <li key={index} className="text-green-600">{item}</li>
                ))}
              </ul>
            </div>
            {suggestions.length > 0 && (
              <div>
                <Label className="text-lg font-semibold">{t.suggestions}:</Label>
                <ul className="list-disc list-inside">
                  {suggestions.map((item, index) => (
                    <li key={index} className="text-orange-500">{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div>
            <Label className="text-lg font-semibold mb-2">{t.passwordHistory}</Label>
            <ScrollArea className="h-[100px] w-full rounded-md border p-4">
              {passwordHistory.map((pass, index) => (
                <div key={index} className="flex items-center justify-between mb-2">
                  <span className="font-mono">{'*'.repeat(pass.length)}</span>
                  <Badge variant="secondary">{useAdvancedPasswordStrength(pass).score}%</Badge>
                </div>
              ))}
            </ScrollArea>
          </div>
        </CardContent>
        <CardFooter className="border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500">
            {t.tip}
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

