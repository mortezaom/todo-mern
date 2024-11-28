import { Icon } from '@ricons/utils';
import Add24Regular from '@sicons/fluent/Add24Regular.svg';
import ClipboardTask20Regular from '@sicons/fluent/ClipboardTask20Regular.svg';
import ArrowExportLtr24Filled from '@sicons/fluent/ArrowExportLtr24Filled.svg';
import Delete20Regular from '@sicons/fluent/Delete20Regular.svg';
import Edit20Regular from '@sicons/fluent/Edit20Regular.svg';

export enum IconType {
  AddIcon = 'Add24Regular',
  TaskIcon = 'ClipboardTask20Regular',
  SignoutIcon = 'ArrowExportLtr24Filled',
  DeleteIcon = 'Delete20Regular',
  EditIcon = 'Edit20Regular',
}

const IconsMap = {
  Add24Regular,
  ClipboardTask20Regular,
  ArrowExportLtr24Filled,
  Delete20Regular,
  Edit20Regular,
};

export const SIcon = (props: { type: IconType; size?: number }) => {
  const iconSrc = IconsMap[props.type];

  if (!iconSrc) {
    console.error(`Icon ${props.type} not found`);
    return null;
  }

  return (
    <Icon size={props.size ?? 24} color='fff'>
      <img src={iconSrc} alt={props.type} />
    </Icon>
  );
};
