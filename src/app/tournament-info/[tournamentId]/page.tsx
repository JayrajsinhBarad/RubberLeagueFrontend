import TournamentPageComponent from '@/components/TournamentPageComponent';
import React from 'react'

export default async function page({params}: {params: Promise<{ tournamentId: string }>}) {
const { tournamentId } = await params;

  return (
    <TournamentPageComponent tournamentId={tournamentId} />
  )
}
