'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ModelSettings } from './model-settings'
import { GeneralSettings } from './general-settings'
import { Settings2, Database } from 'lucide-react'
import { ModelSelector } from './model-selector'
import { ModelSummaryCard } from './settings-summary'
import { AdminSettings } from '@/lib/admin/types'

interface SettingsClientProps {
  settings: AdminSettings
}

export function SettingsClient({ settings }: SettingsClientProps) {
  const [selectedModel, setSelectedModel] = useState<string | null>(settings.models[0]?.id || null)
  const [showGeneral, setShowGeneral] = useState(false)
  
  const currentModel = settings.models.find(m => m.id === selectedModel)
  
  return (
    <div className="space-y-6">
      {/* Top Section with Configuration and Quick Stats */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Configuration Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ModelSelector
              models={settings.models}
              selectedModel={selectedModel}
              onSelectModel={(id) => {
                setSelectedModel(id)
                setShowGeneral(false)
              }}
            />
            
            <Button
              variant={showGeneral ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                setShowGeneral(true)
                setSelectedModel(null)
              }}
            >
              <Settings2 className="mr-2 h-4 w-4" />
              General Settings
            </Button>
          </CardContent>
        </Card>
        
        {/* Model Summary Card */}
        {currentModel && <ModelSummaryCard model={currentModel} />}
      </div>
      
      {/* Main Content */}
      {showGeneral ? (
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Configure global admin panel settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GeneralSettings />
          </CardContent>
        </Card>
      ) : currentModel ? (
        <ModelSettings model={currentModel} />
      ) : (
        <Card>
          <CardContent className="flex items-center justify-center h-[400px] text-muted-foreground">
            <div className="text-center">
              <Database className="h-12 w-12 mx-auto mb-4" />
              <p>Select a model to configure its settings</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}