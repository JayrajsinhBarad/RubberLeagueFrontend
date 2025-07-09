import TournamentPageComponent from '@/components/TournamentPageComponent';
import React from 'react'

export default function page({params}: {params: {tournamentId: string}}) {

  const { tournamentId } = params;

  return (
    <TournamentPageComponent tournamentId={tournamentId} />
  )
}
