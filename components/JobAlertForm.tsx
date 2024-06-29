'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Select, { MultiValue } from 'react-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from "@/components/ui/use-toast";
import supabase from '@/utils/supabase/client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { createContact, updateContact } from '@/utils/loopsApi';

const jobAlertSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: 'Invalid email address' }).optional(),
  location: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  jobFunction: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  industry: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  seniority: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  employmentType: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
});

type Option = {
  value: string;
  label: string;
};

type JobAlertFormProps = {
  locations: Option[];
  jobFunctions: Option[];
  industries: Option[];
  seniorities: Option[];
  employmentTypes: Option[];
};

const JobAlertForm: React.FC<JobAlertFormProps> = ({ locations, jobFunctions, industries, seniorities, employmentTypes }) => {
  const { toast } = useToast();
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState<z.infer<typeof jobAlertSchema> | null>(null);
  const [existingAlertId, setExistingAlertId] = useState<number | null>(null);

  const form = useForm({
    resolver: zodResolver(jobAlertSchema),
    defaultValues: {
      name: '',
      email: '',
      location: [],
      jobFunction: [],
      industry: [],
      seniority: [],
      employmentType: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof jobAlertSchema>) => {
    setFormData(values);

    const { data, error } = await supabase
      .from('jobAlerts')
      .select('id')
      .eq('email', values.email);

    if (error) {
      toast({
        description: "Failed to create job alert.",
        variant: "destructive",
      });
      return;
    }

    if (data.length > 0) {
      setExistingAlertId(data[0].id);
      setShowAlert(true);
    } else {
      await createAlert(values);
    }
  };

  const createAlert = async (values: z.infer<typeof jobAlertSchema>) => {
    const { error } = await supabase.from('jobAlerts').insert([
      {
        name: values.name,
        email: values.email,
        location: values.location?.map(loc => loc.value).join(', ') || '',
        job_function: values.jobFunction?.map(func => func.value).join(', ') || '',
        industry: values.industry?.map(ind => ind.value).join(', ') || '',
        seniority: values.seniority?.map(sen => sen.value).join(', ') || '',
        employment_type: values.employmentType?.map(emp => emp.value).join(', ') || '',
        doi: false,
        matching_job_ids: '',
      }
    ]);

    if (error) {
      toast({
        description: "Failed to create job alert.",
        variant: "destructive",
      });
    } else {
      // Call Loops API to create contact
      await createContact(values.email!, {
        firstName: values.name,
        source: 'Job Alert Form',
        location: values.location?.map(loc => loc.label).join(', ') || '',
        jobFunction: values.jobFunction?.map(func => func.label).join(', ') || '',
        industry: values.industry?.map(ind => ind.label).join(', ') || '',
        seniority: values.seniority?.map(sen => sen.label).join(', ') || '',
        employmentType: values.employmentType?.map(emp => emp.label).join(', ') || '',
      });

      form.reset();
      toast({
        description: "Job alert successfully created.",
      });
    }
  };

  const updateAlert = async () => {
    if (!formData || existingAlertId === null) return;

    const { error } = await supabase
      .from('jobAlerts')
      .update({
        name: formData.name,
        location: formData.location?.map(loc => loc.value).join(', ') || '',
        job_function: formData.jobFunction?.map(func => func.value).join(', ') || '',
        industry: formData.industry?.map(ind => ind.value).join(', ') || '',
        seniority: formData.seniority?.map(sen => sen.value).join(', ') || '',
        employment_type: formData.employmentType?.map(emp => emp.value).join(', ') || '',
      })
      .eq('id', existingAlertId);

    if (error) {
      toast({
        description: "Failed to update job alert.",
        variant: "destructive",
      });
    } else {
      // Call Loops API to update contact
      await updateContact(formData.email!, {
        firstName: formData.name,
        source: 'Job Alert Form',
        location: formData.location?.map(loc => loc.label).join(', ') || '',
        jobFunction: formData.jobFunction?.map(func => func.label).join(', ') || '',
        industry: formData.industry?.map(ind => ind.label).join(', ') || '',
        seniority: formData.seniority?.map(sen => sen.label).join(', ') || '',
        employmentType: formData.employmentType?.map(emp => emp.label).join(', ') || '',
      });

      form.reset();
      toast({
        description: "Job alert successfully updated.",
      });
    }

    setShowAlert(false);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Controller
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <Select
                        isMulti
                        options={locations}
                        value={field.value as MultiValue<Option>}
                        onChange={field.onChange}
                        placeholder="Select location(s)"
                      />
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobFunction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Function</FormLabel>
                <FormControl>
                  <Controller
                    control={form.control}
                    name="jobFunction"
                    render={({ field }) => (
                      <Select
                        isMulti
                        options={jobFunctions}
                        value={field.value as MultiValue<Option>}
                        onChange={field.onChange}
                        placeholder="Select job function(s)"
                      />
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <FormControl>
                  <Controller
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <Select
                        isMulti
                        options={industries}
                        value={field.value as MultiValue<Option>}
                        onChange={field.onChange}
                        placeholder="Select industry"
                      />
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="seniority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seniority</FormLabel>
                <FormControl>
                  <Controller
                    control={form.control}
                    name="seniority"
                    render={({ field }) => (
                      <Select
                        isMulti
                        options={seniorities}
                        value={field.value as MultiValue<Option>}
                        onChange={field.onChange}
                        placeholder="Select seniority level"
                      />
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employmentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employment Type</FormLabel>
                <FormControl>
                <Controller
                    control={form.control}
                    name="employmentType"
                    render={({ field }) => (
                      <Select
                        isMulti
                        options={employmentTypes}
                        value={field.value as MultiValue<Option>}
                        onChange={field.onChange}
                        placeholder="Select employment type"
                      />
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create Job Alert</Button>
        </form>
      </Form>

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Existing Alert Found</AlertDialogTitle>
            <AlertDialogDescription>
              An alert with this email already exists. Do you want to update the existing alert with the new preferences or keep the existing one?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowAlert(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={updateAlert}>Update</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default JobAlertForm;
                   