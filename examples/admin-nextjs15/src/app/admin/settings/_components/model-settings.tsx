'use client'

import React, { useState } from 'react'
import { AdminModel } from '@/lib/admin/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldConfig } from './field-config'
import { Button } from '@/components/ui/button'
import { Save, AlertCircle, Shield, Eye, Database, ChevronDown } from 'lucide-react'
import { saveModelSettings } from '@/lib/actions/settings'
import { toast } from 'sonner'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

interface ModelSettingsProps {
  model: AdminModel
}

export function ModelSettings({ model: initialModel }: ModelSettingsProps) {
  const [model, setModel] = useState(initialModel)
  const [isSaving, setIsSaving] = useState(false)
  
  // Update state when prop changes (when switching models)
  React.useEffect(() => {
    setModel(initialModel)
  }, [initialModel.id])
  
  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Save the current model along with other models
      await saveModelSettings([model])
      toast.success('Settings saved successfully')
    } catch (error) {
      toast.error('Failed to save settings')
    } finally {
      setIsSaving(false)
    }
  }
  
  const hasChanges = JSON.stringify(model) !== JSON.stringify(initialModel)
  
  return (
    <div className="space-y-6">
      {/* Save Changes Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={!hasChanges || isSaving}
          size="sm"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
      
      {/* Model and Field Configuration Side by Side */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Main Configuration Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Database className="h-5 w-5 text-muted-foreground" />
              <div>
                <CardTitle>{model.name}</CardTitle>
                <CardDescription>Configure how the {model.name} model appears in the admin panel</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Settings */}
            <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={model.name}
                onChange={(e) => setModel({ ...model, name: e.target.value })}
                placeholder="Display name for this model"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="idField">ID Field</Label>
              <Select
                value={model.idField}
                onValueChange={(value) => setModel({ ...model, idField: value })}
              >
                <SelectTrigger id="idField">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {model.fields
                    .filter(f => f.isId || f.unique)
                    .map(field => (
                      <SelectItem key={field.id} value={field.name}>
                        {field.name} ({field.type})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Collapsible Sections */}
          <Accordion type="multiple" className="w-full">
            {/* Display Fields Section */}
            <AccordionItem value="display-fields">
              <AccordionTrigger className="text-base">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>Display Fields</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Select fields to show when displaying this model in relations
                  </p>
                  <div className="grid gap-2">
                    {model.fields
                      .filter(f => !f.relationField && !f.list)
                      .map(field => (
                        <label
                          key={field.id}
                          className="flex items-center space-x-2 cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
                        >
                          <Checkbox
                            checked={model.displayFields.includes(field.name)}
                            onCheckedChange={(checked) => {
                              const displayFields = checked
                                ? [...model.displayFields, field.name]
                                : model.displayFields.filter(f => f !== field.name)
                              setModel({ ...model, displayFields })
                            }}
                          />
                          <span className="text-sm">{field.title}</span>
                        </label>
                      ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Permissions Section */}
            <AccordionItem value="permissions">
              <AccordionTrigger className="text-base">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Permissions</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Configure what operations are allowed on this model
                  </p>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <Checkbox
                      checked={model.create}
                      onCheckedChange={(checked) => setModel({ ...model, create: !!checked })}
                    />
                    <div>
                      <div className="font-medium">Allow Create</div>
                      <div className="text-sm text-muted-foreground">Users can create new records</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <Checkbox
                      checked={model.update}
                      onCheckedChange={(checked) => setModel({ ...model, update: !!checked })}
                    />
                    <div>
                      <div className="font-medium">Allow Update</div>
                      <div className="text-sm text-muted-foreground">Users can edit existing records</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <Checkbox
                      checked={model.delete}
                      onCheckedChange={(checked) => setModel({ ...model, delete: !!checked })}
                    />
                    <div>
                      <div className="font-medium">Allow Delete</div>
                      <div className="text-sm text-muted-foreground">Users can delete records</div>
                    </div>
                  </label>
                </div>
              </AccordionContent>
            </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
        
        {/* Field Configuration Section */}
        <Card>
          <CardHeader>
            <CardTitle>Field Configuration</CardTitle>
            <CardDescription>Configure display settings and permissions for each field</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <FieldConfig
              model={model}
              onUpdateField={(fieldId, updates) => {
                setModel({
                  ...model,
                  fields: model.fields.map(f =>
                    f.id === fieldId ? { ...f, ...updates } : f
                  )
                })
              }}
              onReorderFields={(fields) => {
                setModel({ ...model, fields })
              }}
            />
          </CardContent>
        </Card>
      </div>
      
      {hasChanges && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You have unsaved changes. Click "Save Changes" to apply them.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}