import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import React from "react";
import { X } from "lucide-react";

function ImageViewer({ selectedImage, setSelectedImage }: { selectedImage: string | null, setSelectedImage: (value: string | null) => void }) {
  return (
    <AnimatePresence>
      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-space-950/80 backdrop-blur-md flex justify-center items-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)} // Cierra al hacer clic fuera
        >
          <motion.div
            className="relative max-w-5xl w-full rounded-3xl p-1.5 md:p-2 bg-linear-to-br from-brand-lavender via-brand-violet to-brand-gold shadow-[0_40px_100px_-30px_rgba(110,57,253,0.8)]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()} // Evita cerrar si se hace clic en la imagen
          >
            <Button
              variant="secondary"
              size="icon"
              aria-label="Cerrar"
              className="absolute top-4 right-4 z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="!size-5 md:!size-7" strokeWidth={3}  />
            </Button>
            <Image
              src={selectedImage}
              alt="Selected Project"
              width={1200}
              height={1200}
              className="w-full h-auto rounded-[1.25rem]"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ImageViewer;
