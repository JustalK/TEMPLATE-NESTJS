import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '@shared/constants/string';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
