import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { settingsDb } from '@/lib/localDb';
import { showError, showSuccess } from '@/utils/toast';
import { Eye, EyeOff, KeyRound, ArrowLeft, Trash2 } from 'lucide-react';

const SetApiKey: React.FC = () => {
  const navigate = useNavigate();
  const [defaultKey, setDefaultKey] = useState('');
  const [backupKey, setBackupKey] = useState('');
  const [showDefault, setShowDefault] = useState(false);
  const [showBackup, setShowBackup] = useState(false);

  useEffect(() => {
    const savedDefault = settingsDb.getGeminiDefaultFallbackApiKey();
    const savedBackup = settingsDb.getGeminiBackupFallbackApiKey();
    if (savedDefault) setDefaultKey(savedDefault);
    if (savedBackup) setBackupKey(savedBackup);
  }, []);

  const handleSave = () => {
    const d = defaultKey.trim();
    const b = backupKey.trim();
    if (!d || !b) {
      showError('Ingresa la API Key por defecto y la de respaldo.');
      return;
    }
    settingsDb.saveGeminiDefaultFallbackApiKey(d);
    settingsDb.saveGeminiBackupFallbackApiKey(b);
    showSuccess('API Keys de respaldo guardadas');
  };

  const handleClear = () => {
    settingsDb.clearGeminiDefaultFallbackApiKey();
    settingsDb.clearGeminiBackupFallbackApiKey();
    setDefaultKey('');
    setBackupKey('');
    showSuccess('API Keys de respaldo eliminadas');
  };

  return (
    <div className="container mx-auto p-4 min-h-[calc(100vh-64px)]">
      <div className="mb-6 flex items-center gap-2">
        <Button type="button" variant="outline" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-blue-500" />
            <CardTitle>Respaldo de API Keys (Gemini)</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="text-sm text-muted-foreground">
            Estas claves se usan como respaldo cuando las API Keys constantes del proyecto fallan.
          </div>

          <div className="space-y-2">
            <Label htmlFor="gemini-default-fallback">API Key por defecto</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="gemini-default-fallback"
                  type={showDefault ? 'text' : 'password'}
                  value={defaultKey}
                  onChange={(e) => setDefaultKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowDefault((v) => !v)}
                >
                  {showDefault ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gemini-backup-fallback">API Key de respaldo</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="gemini-backup-fallback"
                  type={showBackup ? 'text' : 'password'}
                  value={backupKey}
                  onChange={(e) => setBackupKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowBackup((v) => !v)}
                >
                  {showBackup ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-end">
            <Button type="button" variant="outline" onClick={handleClear}>
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </Button>
            <Button type="button" onClick={handleSave}>
              Guardar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetApiKey;
