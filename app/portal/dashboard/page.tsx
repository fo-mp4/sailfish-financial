import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/portal')

  // Pull client profile from clients table
  const { data: profile } = await supabase
    .from('clients')
    .select('business_name, contact_name')
    .eq('id', user.id)
    .single()

  // List available months from storage (folders under client's ID)
  const { data: objects } = await supabase.storage
    .from('client-charts')
    .list(user.id, { limit: 100, sortBy: { column: 'name', order: 'desc' } })

  const months = (objects ?? [])
    .filter(o => o.id === null) // folders have null id
    .map(o => o.name)
    .sort((a, b) => b.localeCompare(a))

  return (
    <DashboardClient
      userId={user.id}
      businessName={profile?.business_name ?? 'Your Business'}
      contactName={profile?.contact_name ?? ''}
      availableMonths={months}
    />
  )
}
