'use client';
import { Button } from '@src/components/ui/button';
import { Field, FieldError, FieldLabel } from '@src/components/ui/fields';
import { Input } from '@src/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import useCreateRoom from './_hooks/useCreateRoom';

type IForm = {
    title: string;
};

export default function Home() {
    const form = useForm<IForm>({
        defaultValues: {
            title: '',
        },
    });

    const { loading, onCreate } = useCreateRoom();

    const onSubmit = (values: IForm) => {
        onCreate({
            title: values.title.trim(),
        });
    };

    return (
        <div className='fixed inset-0 grid place-items-center bg-gray-50'>
            <div className='max-w-125 w-full rounded-xl p-5 bg-white'>
                <h2 className='mb-7 text-xl font-bold'>
                    Create room livestream
                </h2>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'
                >
                    <Controller
                        control={form.control}
                        rules={{
                            required: 'Please enter room name',
                        }}
                        name='title'
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Room name</FieldLabel>
                                <Input
                                    placeholder='Enter room name'
                                    {...field}
                                />
                                {fieldState.invalid && (
                                    <FieldError
                                        translateText={false}
                                        errors={[fieldState.error]}
                                    />
                                )}
                            </Field>
                        )}
                    />

                    <Button loading={loading} type='submit'>
                        Create
                    </Button>
                </form>
            </div>
        </div>
    );
}
