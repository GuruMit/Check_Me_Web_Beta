import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/Badges';
import { Card } from '@/components/ui/Cards';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/Tooltips';

interface JustificationDetailProps {
  title: string;
  subtitle: string;
  date: string;
  time: string;
}

const JustificationDetail: React.FC<JustificationDetailProps> = ({
  title,
  subtitle,
  date,
  time
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <div className="flex justify-between">
          <div>
            <h2 className="font-bold text-lg">{title}</h2>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
          <div className="text-right">
            <p className="font-bold">{time}</p>
            <p className="text-sm text-gray-500">{date}</p>
          </div>
        </div>
      </div>

      <div className="flex-grow mb-6">
        <p className="text-sm text-gray-500 mb-1">Pièce jointe</p>
        <Card className="border-2 p-1">
          {/* Prescription card with green corner accents */}
          <div className="relative border border-gray-300 p-4">
            {/* Green corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-green-400"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-green-400"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-green-400"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-green-400"></div>
            
            {/* Prescription content */}
            <div className="text-center mb-2">
              <h3 className="font-bold">LA PREMIÈRE PHARMACIE</h3>
              <p className="text-xs">123A RUE PRINCIPALE, NOTREVILLE, QC A1A 1A1</p>
              <p className="text-xs">418-555-5555 MAGASIN N° 1345</p>
            </div>
            
            <div className="mb-4 text-center">
              <h4 className="font-medium">REÇU D'ORDONNANCE OFFICIEL</h4>
            </div>
            
            <div className="grid grid-cols-2 mb-3">
              <div>
                <p className="text-xs mb-1">Rx : 21754888</p>
                <p className="text-xs mb-1">VOTRE NOM</p>
                <p className="text-xs mb-1">Votre adresse</p>
                <p className="text-xs mb-1">Votre ville, province</p>
                <p className="text-xs mb-1">000 000-1234</p>
              </div>
              <div className="text-right">
                <p className="text-xs">Le 1<sup>er</sup> mars 2014</p>
              </div>
            </div>
            
            <div className="mb-3">
              <p className="text-xs">Dr A. Lee</p>
              <p className="text-xs italic">MÉDICAMENT Z 500 mg 21 comprimés</p>
              <p className="text-xs text-right">Jours : 7    Ren. : 3</p>
              <p className="text-xs">DIN 1234567</p>
            </div>
            
            <div className="mb-3">
              <p className="text-xs">Prix G$/CA</p>
              <p className="text-xs">C : 45,40 $   F : 11,99 $   T : 57,39 $</p>
            </div>
            
            <div className="mb-3">
              <p className="text-xs">
                Le patient paye : <span className="border border-black px-1">11,99 $</span>
              </p>
            </div>
            
            <div>
              <p className="text-xs">Signature du pharmacien __________________</p>
              <div className="h-5 relative">
                <div className="absolute right-14 -top-2">
                  <svg width="70" height="20" viewBox="0 0 70 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1,15 C5,5 10,20 15,10 C20,5 25,15 35,5 C45,15 55,5 65,10" stroke="black" strokeWidth="1" fill="none" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-auto space-y-4">
        <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-4">
          Convoquer l'étudiant
        </Button>
        
        <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4">
          Valider la demande
        </Button>
      </div>
    </div>
  );
};

export default JustificationDetail;
