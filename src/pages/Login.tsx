import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Isotipo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { brand } from '@/lib/brand';

export function Login() {
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    navigate('/dashboard');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-col items-center gap-3">
          <Isotipo size={44} />
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="font-heading text-lg font-semibold text-foreground">
              <span className="text-foreground">ACCESO</span>
              <span className="text-[#159DAA]">TDF</span>
            </h1>
            <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
              Control total. Siempre.
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="usuario">Usuario</Label>
              <Input id="usuario" placeholder="admin@accesotdf.com.ar" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <Button
              type="submit"
              className="mt-2 border-0 text-white"
              style={{ backgroundImage: brand.gradient }}
            >
              Iniciar turno
            </Button>
          </form>
          <p className="mt-4 text-center font-mono text-xs text-muted-foreground">
            -54.8019, -68.3030 · Río Grande
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
