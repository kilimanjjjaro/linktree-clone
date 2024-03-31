import { CircleHelp, Copy } from 'lucide-react'
import AvatarSettings from '@/components/link-config/profile-settings/avatar/avatar-settings'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { TypographyH3 } from '@/components/ui/typography/typography-h3'
import { Separator } from '@/components/ui/separator'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

export default function LinkConfig() {
  return (
    <aside className='flex h-full w-96 flex-col gap-6 overflow-hidden'>
      <section className='rounded-2xl border border-border bg-background'>
        <div className='h-12 border-b border-b-border p-3 text-center'>
          <TypographyH3>Profile</TypographyH3>
        </div>
        <div className='flex flex-col'>
          <AvatarSettings />
          <Separator />
          <div className='flex flex-col gap-3 p-5'>
            <div className='flex items-center gap-2'>
              <Label htmlFor='link-name'>Name</Label>
              <Popover>
                <PopoverTrigger>
                  <CircleHelp className='h-3.5 w-3.5' strokeWidth={1.5} />
                  <span className='sr-only'>Show help</span>
                </PopoverTrigger>
                <PopoverContent>
                  <p className='text-sm text-muted-foreground'>
                    This will be used as the URL for your link and for SEO. You
                    can change it as many times as you want.
                  </p>
                </PopoverContent>
              </Popover>
            </div>
            <div className='group relative flex h-10 items-center overflow-hidden rounded-xl border border-border has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background'>
              <span className='flex h-full cursor-not-allowed select-none items-center border-r border-border px-3 text-sm text-muted-foreground'>
                linktr.ee/
              </span>
              <Input
                id='link-name'
                className='rounded-none border-none px-3 placeholder:text-white focus-visible:ring-0 focus-visible:ring-offset-0'
                type='text'
                placeholder='kilimanjjjaro'
              />
              <Button
                size='icon'
                variant='outline'
                className='absolute right-1.5 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100'
              >
                <Copy className='h-3 w-3' strokeWidth={1.5} />
                <span className='sr-only'>Copy Order ID</span>
              </Button>
            </div>
          </div>
          <Separator />
          <div className='flex flex-col gap-3 p-5'>
            <div className='flex items-center gap-2'>
              <Label htmlFor='link-description'>Description</Label>
              <Popover>
                <PopoverTrigger>
                  <CircleHelp className='h-3.5 w-3.5' />
                </PopoverTrigger>
                <PopoverContent>
                  <p className='text-sm text-muted-foreground'>
                    Short description for your link. This will be used in the
                    header and to improve the SEO of your link.
                  </p>
                </PopoverContent>
              </Popover>
            </div>
            <Textarea
              id='link-description'
              className='p-3'
              placeholder="I'm a Full Stack Developer and these are my projects."
            />
          </div>
        </div>
      </section>
    </aside>
  )
}
