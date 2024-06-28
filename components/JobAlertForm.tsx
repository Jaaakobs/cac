'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Select, { SingleValue, MultiValue } from 'react-select';
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
import supabase from '@/utils/supabase/client'; // Adjust the import path according to your project structure

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
    const { error } = await supabase.from('jobAlerts').insert([
      {
        name: values.name,
        email: values.email,
        location: values.location?.map(loc => loc.value).join(', ') || '',
        job_function: values.jobFunction?.map(func => func.value).join(', ') || '',
        industry: values.industry?.map(ind => ind.value).join(', ') || '',
        seniority: values.seniority?.map(sen => sen.value).join(', ') || '',
        employment_type: values.employmentType?.map(emp => emp.value).join(', ') || '',
        doi: false,  // Assuming default value for DOI
        matching_job_ids: '',  // Assuming this is initially empty
      }
    ]);
  
    if (error) {
      toast({
        description: "Failed to create job alert.",
        variant: "destructive",
      });
    } else {
      form.reset();
      toast({
        description: "Job alert successfully created.",
      });
    }
  };

  return (
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
  );
};

export default JobAlertForm;