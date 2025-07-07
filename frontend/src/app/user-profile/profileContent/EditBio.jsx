"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

const EditBio = ({ isOpen, onClose, initialData }) => {
  

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>Edit Bio</DialogHeader>
        <form >
          <div className="grid gap-4 py-4">
            {[
              { label: "Bio", id: "bioText", type: "textarea" },
              { label: "Live In", id: "liveIn" },
              { label: "Relationship", id: "relationship" },
              { label: "Workplace", id: "workplace" },
              { label: "Education", id: "education" },
              { label: "Phone", id: "phone" },
              { label: "Hometown", id: "hometown" },
            ].map((field) => (
              <div className="grid grid-cols-4 items-center gap-4" key={field.id}>
                <Label htmlFor={field.id} className="text-right">{field.label}</Label>
                {field.type === "textarea" ? (
                  <Textarea id={field.id} className="col-span-3"  />
                ) : (
                  <Input id={field.id} className="col-span-3"  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="submit" >
              <Save className="w-4 h-4 mr-2" />
             Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBio;
