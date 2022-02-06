import React from 'react';
import { observer } from 'mobx-react';
import { Button, HStack } from '@chakra-ui/react';
import { FaPhone, FaTelegram, FaTwitter } from 'react-icons/fa';
import type { IContactsProps } from '.';

const Contacts: React.FC<IContactsProps> = observer(({ contacts }) => {
  if (contacts === null) return null;

  const { phone_number, twitter_id, telegram_id } = contacts;

  const phoneHandler = () => window.open(`tel:${phone_number}`, '_blank');
  const twitterHandler = () => window.open(`https://twitter.com/${twitter_id?.substring(1)}`, '_blank');
  const telegramHandler = () => window.open(`https://t.me/${telegram_id?.substring(1)}`, '_blank');

  return (
    <HStack mt='5'>
      {phone_number && (
        <Button onClick={phoneHandler} colorScheme='whatsapp' size='xs' leftIcon={<FaPhone />}>
          Call me
        </Button>
      )}
      {twitter_id && (
        <Button onClick={twitterHandler} colorScheme='twitter' size='xs' leftIcon={<FaTwitter />}>
          Twitter
        </Button>
      )}
      {telegram_id && (
        <Button onClick={telegramHandler} colorScheme={'telegram'} size='xs' leftIcon={<FaTelegram />}>
          Telegram
        </Button>
      )}
    </HStack>
  );
});

export { Contacts };
