import React from 'react';
import { Textarea } from "@/components/ui/textarea"

interface DisplayFieldProps {
    value: string;
}

interface MotifDisplayProps {
  motifText: string;
}

const DisplayField: React.FC<DisplayFieldProps> = ({value}) => {
    return (
        <div className="space-y-1">
            <Textarea
                id="display-field"
                value={value}
                readOnly // Make the field non-editable
                className="w-full border text-justify border-gray-50 text-[#71717A] rounded-l min-h-[100px] resize-none" // Added min-height, removed resize
                rows={4}
            />
        </div>
    );
};

const MotifDisplay: React.FC<MotifDisplayProps> = ({ motifText }) => {
    // const [motifText, setMotifText] = React.useState('J\'étais absent pour raison de maladie, permettez-moi de vous présenter mon carnet de santé, merci !');

    return (
        <div className="flex items-center justify-center mt-10">
            <div className="w-full max-w-md border-2 relative border-[#A5A5A5] bg-white rounded-xl px-2 py-6 "> 
                <h2 className="text-sm text-[#71717A] font-semibold absolute px-2 bg-white top-[-10px]">Motif</h2> 
                <DisplayField
                    value={motifText}
                />
            </div>
        </div>
    );
};

export default MotifDisplay;
