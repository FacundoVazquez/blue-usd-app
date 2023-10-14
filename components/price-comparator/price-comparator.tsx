import {
  Box,
  Button,
  Checkbox,
  Divider,
  Fieldset,
  Flex,
  Grid,
  Group,
  NumberInput,
  Text,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { ChangeEvent, useEffect, useState } from 'react';

import {
  DatePrice,
  PriceComparatorFormValues,
  PriceComparatorResult,
} from './price-comparator.type';

interface Props {
  dateFormat?: string;
}

const PriceComparator: React.FC<Props> = ({ dateFormat = 'DD-MM-YYYY' }) => {
  //#region Lifecycle
  useEffect(() => {}, []);
  //#endregion

  //#region Hooks
  const [result, setResult] = useState<PriceComparatorResult | null>(null);
  const form = useForm<PriceComparatorFormValues>({
    initialValues: {
      dateA: dayjs().subtract(1, 'year').toDate(),
      dateB: new Date(),
      priceA: 200,
      priceB: 500,
      useToday: true,
    },

    validate: {
      dateA: (value) => value === null,
      dateB: (value) => value === null,
      priceA: (value) => !(value > 0 && value <= 100000000),
      priceB: (value) => !(value > 0 && value <= 100000000),
    },
  });
  //#endregion

  //#region Methods
  const getValidDate = (date: dayjs.Dayjs) => {
    let validDate = dayjs(date);

    if (dayjs(date, dateFormat).day() === 0) {
      validDate = dayjs(date, dateFormat).subtract(2, 'day');
    } else if (dayjs(date, dateFormat).day() === 6) {
      validDate = dayjs(date, dateFormat).subtract(1, 'day');
    }

    console.log(date.toDate(), validDate.toDate());

    return validDate;
  };

  const getPrice = async (values: DatePrice) => {
    const firstDate = getValidDate(dayjs(values.date, dateFormat).subtract(1, 'day')).format(
      'YYYY-MM-DD'
    );
    const secondDate = getValidDate(dayjs(values.date, dateFormat)).format('YYYY-MM-DD');

    const api = {
      url: `https://mercados.ambito.com//dolar/informal/historico-general/${firstDate}/${secondDate}`,
    };

    let price = 0;

    try {
      const response = await axios.get(api.url);
      price = +(response.data[1][1] as string).replace(',', '.');
    } catch (err) {
      console.error(err);
    }
    return price;
  };
  //#endregion

  //#region Handlers
  const onChangeToday = ({ event }: { event: ChangeEvent<HTMLInputElement> }) => {
    form.setFieldValue('useToday', event.currentTarget.checked);
    form.setFieldValue('dateB', new Date());
  };

  const onSubmitForm = async ({ values }: { values: PriceComparatorFormValues }) => {
    const priceOne =
      values.priceA / (await getPrice({ date: values.dateA!, price: values.priceA }))!;
    const priceTwo =
      values.priceB / (await getPrice({ date: values.dateB!, price: values.priceB }))!;
    const _result: PriceComparatorResult = {
      priceOne,
      priceTwo,
      diff: priceTwo - priceOne,
    };
    console.table(_result);
    setResult(_result);
  };
  //#endregion

  return (
    <>
      <Box mx="auto">
        <form onSubmit={form.onSubmit((values) => onSubmitForm({ values }))}>
          <Fieldset>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <DateInput
                  label="Date"
                  placeholder="Date"
                  minDate={dayjs(new Date()).subtract(5, 'years').toDate()}
                  maxDate={dayjs(new Date()).subtract(1, 'day').toDate()}
                  valueFormat={dateFormat}
                  {...form.getInputProps('dateA')}
                />
                <NumberInput
                  label="Price"
                  placeholder="Price"
                  hideControls
                  {...form.getInputProps('priceA')}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Group key="dateB">
                  <DateInput
                    label="Date"
                    placeholder="Date"
                    minDate={dayjs(new Date()).subtract(5, 'years').toDate()}
                    maxDate={new Date()}
                    valueFormat={dateFormat}
                    disabled={form.values.useToday}
                    {...form.getInputProps('dateB')}
                  />
                  <Checkbox
                    mt="lg"
                    label="Today"
                    {...form.getInputProps('useToday', { type: 'checkbox' })}
                    onChange={(event) => onChangeToday({ event })}
                  />
                </Group>
                <NumberInput
                  label="Price"
                  placeholder="Price"
                  hideControls
                  {...form.getInputProps('priceB')}
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <Group justify="flex-end" mt="md">
                  <Button type="submit">Compare</Button>
                </Group>
              </Grid.Col>
            </Grid>
          </Fieldset>
        </form>
        <Flex justify="center" align="center" direction="row" wrap="wrap">
          {result && (
            <>
              <div style={{ textAlign: 'center' }}>
                <Text span size="lg" c="blue">{`${result.priceOne.toFixed(2)} USD`}</Text>
                <Text span size="lg">
                  {' / '}
                </Text>
                <Text span size="lg" c="teal.6">{`${result.priceTwo.toFixed(2)} USD`}</Text>
                <Divider size="xs" />
                <Text
                  style={{ alignContent: 'center' }}
                  span
                  size="lg"
                  c={result.diff <= 0 ? 'green' : 'red'}
                >
                  {`${result.diff.toFixed(2)} USD`}
                </Text>
              </div>
            </>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default PriceComparator;
